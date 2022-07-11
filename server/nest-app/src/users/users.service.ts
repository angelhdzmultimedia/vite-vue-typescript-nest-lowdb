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
}
