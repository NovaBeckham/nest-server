/*
 * @Description:
 * @Author: hyx
 * @Date: 2024-10-17 16:00:41
 */

import { EmailService } from '@/processors/helper/helper.service.email'
import { IPService } from '@/processors/helper/helper.service.ip'
import { Body, Controller, HttpStatus, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { QueryParams, QueryParamsResult } from '@/decorators/queryparams'
import { AuthLoginDTO } from './auth.dto'
import { APP } from '@/app.config'
import { Responser } from '@/decorators/responser'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly ipService: IPService,
    private readonly emailService: EmailService,
    private readonly authService: AuthService
  ) {}

  @Post('login')
  @Responser.handle({ message: 'Login', error: HttpStatus.BAD_REQUEST })
  async login(@QueryParams() { visitor: { ip } }: QueryParamsResult, @Body() body: AuthLoginDTO) {
    const token = await this.authService.adminLogin(body.password)
    if (ip) {
      this.ipService.queryLocation(ip).then((location) => {
        const subject = `App has a new login activity`
        const locationText = location ? [location.country, location.region, location.city].join(' · ') : 'unknow'
        const content = `${subject}. IP: ${ip}, location: ${locationText}`
        this.emailService.sendMailAs(APP.NAME, {
          to: APP.ADMIN_EMAIL,
          subject,
          text: content,
          html: content
        })
      })
    }
    return token
  }
}
