/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get } from '@nestjs/common/';
import { CarsService } from './cars.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('cars')
@Controller('cars')
export class CarsController {
  constructor(private readonly appService: CarsService) {}

  @Get()
  getAll(): string {
    return this.appService.getAll();
  }
}
