import { writeFile, readFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';

export class Model<T> {
  private path: string;

  constructor(name: string, private schema: Schema<T>) {
    this.path = `${name}s.json`.toLowerCase();
    if (!existsSync(join(process.cwd(), this.path))) {
      writeFile(join(process.cwd(), this.path), JSON.stringify([]));
    }
  }

  private async save(data: T[]): Promise<void> {
    await writeFile(join(process.cwd(), this.path), JSON.stringify(data));
  }

  public async find(options: any): Promise<T[]> {
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
