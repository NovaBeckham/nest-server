/*
 * @Description:
 * @Author: hyx
 * @Date: 2024-10-18 16:56:50
 */

import { Module } from '@nestjs/common'
import { UserInfoService } from './user-info.service'
import { UserInfoController } from './user-info.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserInfo } from './entities/user-info.entity'
import { Share } from '@/utils/share'

@Module({
  imports: [TypeOrmModule.forFeature([UserInfo]), Share],
  controllers: [UserInfoController],
  providers: [UserInfoService],
  exports: [UserInfoService]
})
export class UserInfoModule {}
