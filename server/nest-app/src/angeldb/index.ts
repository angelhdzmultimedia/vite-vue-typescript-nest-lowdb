export class Model<T> {
  private path?: string;

  constructor(name: string, private schema: Schema<T>) {
    this.path = `${name}s`.toLowerCase();
    if (!existsSync(this.path)) {
      writeFile(this.path, JSON.stringify([]));
    }
  }

  private save(payload: T): Promise<void> {
    writeFile(this.path, JSON.stringify(payload));
  }

  public async find(options: any): Promise<T[]> {
    const data: T[] = await this.load();
    return data;
  }

  public async create(payload: T) {
    const data: T[] = await this.load();
    data.push(payload);
    this.save(data);
  }

  private load(): Promise<T[]> {
    const body: string = readFile(this.path);
    return JSON.parse(body) as T[];
  }
}

class SchemaOptions<T> {
  public required?: boolean = false;
  public type?: object = Object;
}

export type Schema<T> = {
  [key: keyof T]: SchemaOptions<T>;
};

export function createModel<T>(name: string, schema: Schema<T>): Model<T> {
  return new Model<T>(name, schema);
}
