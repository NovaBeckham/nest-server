/*
 * @Description:
 * @Author: hyx
 * @Date: 2024-10-18 16:58:30
 */

import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }
}
