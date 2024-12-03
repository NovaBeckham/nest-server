/*
 * @Description:
 * @Author: hyx
 * @Date: 2024-12-03 15:50:15
 */

import { Module } from '@nestjs/common'
import { ExceptionLogService } from './exception.service'
import { ExceptionLogController } from './exception.controller'
import { ExceptionLog } from './entities/exception.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Share } from '../../utils/share'

@Module({
  imports: [TypeOrmModule.forFeature([ExceptionLog]), Share],
  controllers: [ExceptionLogController],
  providers: [ExceptionLogService],
  exports: [ExceptionLogService]
})
export class ExceptionLogModule {}
