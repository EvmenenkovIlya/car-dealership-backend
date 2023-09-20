
import {  CanActivate,  ExecutionContext,  Injectable,  SetMetadata,  UnauthorizedException,} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './auth.constants';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';

export const IS_PRIVATE_KEY = 'isPrivate';
export const Private = () => SetMetadata(IS_PRIVATE_KEY, true);

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPrivate = this.reflector.getAllAndOverride<boolean>(IS_PRIVATE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!isPrivate) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: jwtConstants.secret
        }
      );
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}