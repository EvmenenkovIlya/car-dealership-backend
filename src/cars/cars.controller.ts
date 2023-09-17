import { Controller, Get } from '@nestjs/common/';
import { CarsService } from './cars.service';
import { ApiTags } from '@nestjs/swagger';

const route = 'cars';

@ApiTags(route)
@Controller(route)
export class CarsController {
  constructor(private readonly appService: CarsService) {}

  @Get()
  getAll(): string {
    return this.appService.getAll();
  }
}
