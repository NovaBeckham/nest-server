/*
 * @Description:
 * @Author: hyx
 * @Date: 2024-12-03 18:08:25
 */

import { Module } from '@nestjs/common'
import { RefreshTokenService } from './refresh-token.service'
import { RefresTokenController } from './refresh-token.controller'

@Module({
  controllers: [RefresTokenController],
  providers: [RefreshTokenService],
  exports: [RefreshTokenService]
})
export class RefresTokenModule {}
