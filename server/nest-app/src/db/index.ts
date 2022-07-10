import { readFile, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';

export class Database<T extends any> {
  public data: T = {} as T;

  constructor(private path: string) {
    if (!existsSync(this.path)) {
      writeFile(join(process.cwd(), this.path), JSON.stringify(this.data));
    }
  }

  public async save(): Promise<void> {
    await writeFile(join(process.cwd(), this.path), JSON.stringify(this.data));
  }

  public async load(): Promise<void> {
    const body: Buffer = await readFile(join(process.cwd(), this.path));
    this.data = JSON.parse(body.toString()) as T;
  }
}

export function createDB<T extends any>(path: string): Database<T> {
  const db: Database<T> = new Database<T>(path);
  return db;
}
