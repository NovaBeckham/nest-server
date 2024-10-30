/*
 * @Description:
 * @Author: hyx
 * @Date: 2024-10-30 16:15:53
 */

import { Injectable } from '@nestjs/common'
import { UserInfoService } from '../user/user.service'
import { compare } from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private readonly userInfoService: UserInfoService
  ) {}

  async signin(nickname: string, password: string) {
    const userInfo = await this.userInfoService.isExistUser(nickname)
    const flag = await compare(password, userInfo.password)

    if (userInfo && flag) {

    }
  }
}
