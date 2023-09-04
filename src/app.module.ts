import { UsersModule } from './users/users.module';
import { CarsService } from './cars/cars.service';
import { CarsModule } from './cars/cars.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [UsersModule, CarsModule],
  controllers: [AppController],
  providers: [CarsService, AppService],
})
export class AppModule {}

