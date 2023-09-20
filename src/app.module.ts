import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { UsersModule } from './users/users.module';
import { CarsService } from './cars/cars.service';
import { CarsModule } from './cars/cars.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://adminuser:qwe!23@194.87.210.5:27017/CarsDb?authMechanism=DEFAULT&authSource=admin') , AuthModule, UsersModule, CarsModule],
  controllers: [AppController],
  providers: [AuthService, CarsService, AppService],
})
export class AppModule {}
