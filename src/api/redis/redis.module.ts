/*
 * @Description:
 * @Author: hyx
 * @Date: 2024-10-18 16:45:27
 */

import { Module } from '@nestjs/common'
import { RedisService } from './redis.service'
import { RedisController } from './redis.controller'

@Module({
  providers: [RedisService],
  exports: [RedisService],
  controllers: [RedisController]
})
export class RedisModule {}
