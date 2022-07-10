import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { join } from 'path';
import { createDB, Database } from '../db';

import { User } from './entities/user.entity';

type Data = {
  users: User[];
};

@Injectable()
export class UsersService {
  private db: Database<Data> = {} as Database<Data>;

  constructor() {
    this.init();
  }

  async init() {}

  async create(createUserDto: CreateUserDto): Promise<User | undefined> {
    await this.db.load();
    this.db.data.users.push(createUserDto);
    this.db.save();
    return this.db.data.users.at(-1);
  }

  async findAll(): Promise<User[]> {
    await this.db.load();
    return this.db.data.users;
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
