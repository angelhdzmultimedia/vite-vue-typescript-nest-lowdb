import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { join } from 'path';
import * as lowdb from 'lowdb';
import { User } from './entities/user.entity';

type Data = {
  users: User[];
};

@Injectable()
export class UsersService {
  private db: lowdb.Low;

  constructor() {
    this.init();
  }

  async init() {
    /* const file = join(process.cwd(), 'db.json');
    const adapter = new lowdb.JSONFile<Data>(file);
    this.db = new lowdb.Low(adapter);

    await this.db.read();
    this.db.data ||= { users: [] }; */
  }

  async create(createUserDto: CreateUserDto): Promise<User | undefined> {
    /* await this.db.read();
    const { users } = this.db.data!;
    users.push(createUserDto);
    return users.at(-1); */
    return {} as User;
  }

  async findAll(): Promise<User[]> {
    /*  await this.db.read();
    const { users } = this.db.data!;
    return users; */
    return [];
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
