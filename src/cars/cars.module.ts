import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}
