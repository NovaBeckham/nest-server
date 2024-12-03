/*
 * @Description:
 * @Author: hyx
 * @Date: 2024-12-03 14:42:16
 */

import { Module } from '@nestjs/common'
import { UserInfoModule } from '../user/user.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from '@/constants/jwt'
import { JwtStrategy } from './auth.strategy'

@Module({
  imports: [
    UserInfoModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2d' }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
