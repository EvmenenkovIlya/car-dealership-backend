import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './users.schema';
import { CreateUserDto } from './models/CreateUserDto';
import { ObjectId } from 'mongoose';
import { UpdateUserDto } from './models/UpdateUserDto';

const route = 'users';

@ApiTags(route)
@Controller(route)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getAll(): Promise<User[]> {
    return this.userService.findAll();
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

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() model: UpdateUserDto,
  ){
    return this.userService.update(id, model)
  }
  
  @Delete(':id')
  remove(
    @Param('id') id: string,
    ) {
    return this.userService.remove(id);
  }
}
