
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './auth.constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(login: string, password: string) {
    const user = await this.usersService.findByLogin(login);
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, login: user.login, };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async getUser(token: string) {
      const payload = await this.jwtService.decode(token)
      try {
        return await this.usersService.findByLogin(payload['login']);
      } catch {  
        throw new UnauthorizedException();
      }
  }
}