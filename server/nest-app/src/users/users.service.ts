import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { join } from 'path';
import { UserModel } from '../models/user';

import { User } from './entities/user.entity';

type Data = {
  users: User[];
};

@Injectable()
export class UsersService {
  constructor() {}

  async create(createUserDto: CreateUserDto): Promise<User | undefined> {
    const user: User = await UserModel.create(createUserDto);
    return user;
  }

  async findAll(): Promise<User[]> {
    const users: User[] = await UserModel.find();
    return users;
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
