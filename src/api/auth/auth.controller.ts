/*
 * @Description:
 * @Author: hyx
 * @Date: 2024-10-30 16:16:55
 */

import { Body, Controller, Post, Req } from '@nestjs/common'
import { CreateUserInfoDto } from '../user/dto/createUser.dto'
import { Result } from '@/common/result'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /** 注册 */
  @Post('signup')
  async signup(@Body() userInfoDto: CreateUserInfoDto, @Req() req: any) {
    if (userInfoDto.password !== userInfoDto.confirmPwd) {
      return new Result(null, 406)
    }

    return new Result(await this.authService.signup(userInfoDto))
  }
}
