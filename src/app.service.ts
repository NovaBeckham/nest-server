/*
 * @Description:
 * @Author: hyx
 * @Date: 2024-10-18 16:58:41
 */

import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!'
  }
}
