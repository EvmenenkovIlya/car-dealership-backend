import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { User, UserDocument } from './users.schema';
import { CreateUserDto } from './models/CreateUserDto';
import { UpdateUserDto } from './models/UpdateUserDto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userRepository: Model<UserDocument>) {}

  async create(createCatDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userRepository(createCatDto);
    createdUser.createdAt = new Date();
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find().exec();
  }

  async findById(id: string ):Promise<User>{
    return this.userRepository.findById(id).exec();
  }

  async update(id: string, user: UpdateUserDto ):Promise<User>{
    await this.userRepository.findByIdAndUpdate(id,
       { 
        name: user.name, 
        login: user.login, 
        password: user.password, 
        updatedAt: new Date(),
      }, {upsert: true});

      return this.userRepository.findById(id).exec();
  }

  async remove(id: string ) : Promise<User>{
    return this.userRepository.findByIdAndDelete(id);
  }

  async findOne(username: string) : Promise<User | undefined> {
    return this.userRepository.findOne(user => user.name === username);
  }
}
