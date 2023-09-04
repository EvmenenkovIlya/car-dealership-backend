import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}
