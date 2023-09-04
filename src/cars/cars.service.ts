/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';

@Injectable()
export class CarsService {
    getAll(): string {
        return 'All cars';
      }
}
