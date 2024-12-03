/*
 * @Description:
 * @Author: hyx
 * @Date: 2024-10-30 16:15:53
 */

import { Injectable } from '@nestjs/common'
import { UserInfoService } from '../user/user.service'
import { CreateUserInfoDto } from '../user/dto/createUser.dto'
import { loginError } from '@/common/exception'
import { UserInfo } from '../user/entities/user.entity'
import { createHash } from 'crypto'

@Injectable()
export class AuthService {
  constructor(private readonly userInfoService: UserInfoService) {}

  async signup(registerUser: CreateUserInfoDto) {
    const userFlag = await this.userInfoService.isExistUser(registerUser.nickname)
    if (userFlag) {
      throw new loginError('用户已存在')
    }

    const user = new UserInfo()
    user.nickname = registerUser.nickname
    user.password = createHash('sha256').update(registerUser.password).digest('hex')
    return this.userInfoService.create(user)
  }
}
