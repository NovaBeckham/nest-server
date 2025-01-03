import { Body, Post, Req, Session } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginParamsDto } from './dto/params-auth.dto'
import { Request } from 'express'
import { getRealIp } from '@/utils'

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * @description: 用户登录
   */
  @Post('/login')
  login(@Body() body: LoginParamsDto, @Session() session: CommonType.SessionInfo, @Req() req: Request) {
    return this.authService.login(body, session, getRealIp(req))
  }
}
