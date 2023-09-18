import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './users.schema';
import { CreateUserDto } from './models/CreateUserDto';
import { UpdateUserDto } from './models/UpdateUserDto';
import { Private } from 'src/auth/auth.guard';

const route = 'users';

@ApiTags(route)
@Controller(route)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('by-login')
  getByLogin(
    @Query("login") login: string,
    ): Promise<User | undefined> {
    return this.userService.findByLogin(login);
  }

  @Get(":id")
  getById(
    @Param('id') id: string,
  ): Promise<User> {
    return this.userService.findById(id);
  }

  @Post("add")
  create(
    @Body() model: CreateUserDto,
    ): Promise<User> {
    return this.userService.create(model)
  }

  @Private()
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() model: UpdateUserDto,
  ){
    return this.userService.update(id, model)
  }
  
  @Private()
  @Delete(':id')
  remove(
    @Param('id') id: string,
    ) {
    return this.userService.remove(id);
  }
}
