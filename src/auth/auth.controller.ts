
import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard, Private } from './auth.guard';
import { ApiTags } from '@nestjs/swagger';

const route = 'auth';

@ApiTags(route)
@Controller(route)
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard)
  @Post('get-user-by-token')
  getProfile(
    @Body() payload: Record<string, string>,
    ) {
    return this.authService.getUser(payload.token);
  }
  
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(
    @Body() signInDto: Record<string, string>
    ) {
    return this.authService.signIn(signInDto.login, signInDto.password);
  }
}