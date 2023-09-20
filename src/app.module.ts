import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { UsersModule } from './users/users.module';
import { CarsService } from './cars/cars.service';
import { CarsModule } from './cars/cars.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

require('dotenv').config();

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGODB_URI), AuthModule, UsersModule, CarsModule],
  controllers: [AppController],
  providers: [AuthService, CarsService, AppService],
})
export class AppModule {}
