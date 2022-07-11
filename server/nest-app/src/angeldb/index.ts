import { writeFile, readFile } from 'fs/promises';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { HttpException, HttpStatus } from '@nestjs/common';

/* const HttpStatus = {
  CONTINUE = 100,
  SWITCHING_PROTOCOLS = 101,
  PROCESSING = 102,
  EARLYHINTS = 103,
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NON_AUTHORITATIVE_INFORMATION = 203,
  NO_CONTENT = 204,
  RESET_CONTENT = 205,
  PARTIAL_CONTENT = 206,
  AMBIGUOUS = 300,
  MOVED_PERMANENTLY = 301,
  FOUND = 302,
  SEE_OTHER = 303,
  NOT_MODIFIED = 304,
  TEMPORARY_REDIRECT = 307,
  PERMANENT_REDIRECT = 308,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  PAYMENT_REQUIRED = 402,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  NOT_ACCEPTABLE = 406,
  PROXY_AUTHENTICATION_REQUIRED = 407,
  REQUEST_TIMEOUT = 408,
  CONFLICT = 409,
  GONE = 410,
  LENGTH_REQUIRED = 411,
  PRECONDITION_FAILED = 412,
  PAYLOAD_TOO_LARGE = 413,
  URI_TOO_LONG = 414,
  UNSUPPORTED_MEDIA_TYPE = 415,
  REQUESTED_RANGE_NOT_SATISFIABLE = 416,
  EXPECTATION_FAILED = 417,
  I_AM_A_TEAPOT = 418,
  MISDIRECTED = 421,
  UNPROCESSABLE_ENTITY = 422,
  FAILED_DEPENDENCY = 424,
  PRECONDITION_REQUIRED = 428,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
  HTTP_VERSION_NOT_SUPPORTED = 505,
} */

function match(a: Partial<AuthUser>, b: Partial<AuthUser>): boolean {
  return a.password === b.password;
}

export class Model<T> {
  private path: string;

  constructor(name: string, private schema: Schema<T>) {
    this.path = `db/collections/${name}s.json`.toLowerCase();
    if (!existsSync(join(process.cwd(), 'db/collections'))) {
      mkdirSync(join(process.cwd(), 'db/collections'));
    }
    if (!existsSync(join(process.cwd(), this.path))) {
      writeFile(join(process.cwd(), this.path), JSON.stringify([]));
    }
  }

  private async save(data: T[]): Promise<void> {
    await writeFile(join(process.cwd(), this.path), JSON.stringify(data));
  }

  public async find(options: any = {}): Promise<T[]> {
    const data: T[] = await this.load();
    return data;
  }

  public async create(payload: T): Promise<T> {
    const data: T[] = await this.load();
    data.push(payload);
    this.save(data);
    return payload;
  }

  private async load(): Promise<T[]> {
    const body: Buffer = await readFile(join(process.cwd(), this.path));
    return JSON.parse(body.toString()) as T[];
  }
}

function exclude(obj: any, props: any[]) {
  const newObj: any = {};
  for (const prop of Object.keys(obj)) {
    if (props.indexOf(prop) === -1) {
      newObj[prop] = obj[prop];
    }
  }
  return newObj;
}


export class AuthUser {
  firstName?: string;
  displayName?: string;
  email?: string;
  password?: string;
  id?: number;

  constructor({
    firstName,
    displayName,
    email,
    password,
    id,
  }: Partial<AuthUser>) {
    this.firstName = firstName;
    this.displayName = displayName;
    this.email = email;
    this.password = password;
    this.id = id;
  }

  public static fromJson(json: Partial<AuthUser>) {
    return new AuthUser(json);
  }
}

export class Auth {
  private path: string = `db/auth/auth.json`;

  constructor() {
    if (!existsSync(join(process.cwd(), 'db'))) {
      mkdirSync(join(process.cwd(), 'db'));
    }
    if (!existsSync(join(process.cwd(), 'db/auth'))) {
      mkdirSync(join(process.cwd(), 'db/auth'));
    }
    if (!existsSync(join(process.cwd(), this.path))) {
      writeFile(join(process.cwd(), this.path), JSON.stringify([]));
    }
  }

  private async save(data: AuthUser[]): Promise<void> {
    await writeFile(join(process.cwd(), this.path), JSON.stringify(data));
  }

  public async login(
    payload: Pick<AuthUser, 'email' | 'password'>
  ): Promise<Exclude<AuthUser, 'password'> | undefined> {
    const data: AuthUser[] = await this.load();
    const foundUser: AuthUser | undefined = data.find(
      (item) => item.email === payload.email
    );
    if (!foundUser) {
      throw new HttpException('Email not found.', HttpStatus.NOT_FOUND);
    } else {
      if (match(foundUser, payload)) {
        return exclude(foundUser, ['password']) as Exclude<
          AuthUser,
          'password'
        >;
      } else {
        throw new HttpException('Password incorrect.', HttpStatus.FORBIDDEN);
      }
    }
  }

  public async register(
    payload: AuthUser
  ): Promise<Exclude<AuthUser, 'password'>> {
    const data: AuthUser[] = await this.load();
    const foundUser: AuthUser | undefined = data.find(
      (item) => item.email === payload.email
    );
    if (foundUser) {
      throw new HttpException('Email exists already.', HttpStatus.CONFLICT);
    } else {
      const user: AuthUser = new AuthUser({ ...payload, id: Date.now() });
      data.push(user);
      await this.save(data);
      return exclude(user, ['password']) as Exclude<AuthUser, 'password'>;
    }
  }

  private async load(): Promise<AuthUser[]> {
    const body: Buffer = await readFile(join(process.cwd(), this.path));
    return JSON.parse(body.toString()) as AuthUser[];
  }
}

class SchemaOptions<T> {
  public required?: boolean = false;
  public type?: object = Object;
}

export type Schema<T> = {
  [key: string]: SchemaOptions<T>;
};

export function createModel<T>(name: string, schema: Schema<T>): Model<T> {
  return new Model<T>(name, schema);
}

export function register(payload: AuthUser) {
  const auth: Auth = new Auth();
  return auth.register(payload);
}

export function login(payload: Pick<AuthUser, 'email' | 'password'>) {
  const auth: Auth = new Auth();
  return auth.login(payload);
}
