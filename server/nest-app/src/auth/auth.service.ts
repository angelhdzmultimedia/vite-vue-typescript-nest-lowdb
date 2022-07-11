import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { login, register, AuthUser } from '../angeldb';

@Injectable()
export class AuthService {
  register(body: AuthUser) {
    return register(body);
  }

  login(body: Pick<AuthUser, 'email' | 'password'>) {
    return login(body);
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
