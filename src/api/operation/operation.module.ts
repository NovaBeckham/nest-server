/*
 * @Description:
 * @Author: hyx
 * @Date: 2024-12-03 16:28:21
 */

import { Module } from '@nestjs/common'
import { OperationLogService } from './operation.service'
import { OperationLogController } from './operation.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OperationLog } from './entities/operation.entity'
import { Share } from '@/utils/share'

@Module({
  imports: [TypeOrmModule.forFeature([OperationLog]), Share],
  controllers: [OperationLogController],
  providers: [OperationLogService],
  exports: [OperationLogService]
})
export class OperationLogModule {}
