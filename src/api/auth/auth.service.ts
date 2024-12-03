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
import { RedisService } from '../redis/redis.service'
import { JwtService } from '@nestjs/jwt'
import { RefreshTokenService } from '../refresh-token/refresh-token.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly userInfoService: UserInfoService,
    private readonly jwt: JwtService,
    private readonly redisService: RedisService,
    private readonly refresTokenService: RefreshTokenService
  ) {}

  async signin(nickname: string, password: string) {
    const userinfo = await this.userInfoService.isExistUser(nickname)
    const flag = this.hashPassword(password) === userinfo.password

    if (userinfo && flag) {
      this.redisService.setValue(`user:${userinfo.id}`, userinfo.id.toString(), 7 * 60 * 60 * 24)
      // 生成token此时请求就带有token了
      const user = {
        nickname: userinfo.nickname,
        sub: userinfo.id
      }
      const token = await this.jwt.signAsync(user)
      const refreshToken = this.refresTokenService.generateToken(user)
      delete userinfo.password
      return { userinfo, token, refreshToken }
    }

    throw new loginError('账号或密码错误')
  }

  async signup(registerUser: CreateUserInfoDto) {
    const userFlag = await this.userInfoService.isExistUser(registerUser.nickname)
    if (userFlag) {
      throw new loginError('用户已存在')
    }

    const user = new UserInfo()
    user.nickname = registerUser.nickname
    user.password = this.hashPassword(registerUser.password)
    return this.userInfoService.create(user)
  }

  private hashPassword(password: string) {
    return createHash('sha256').update(password).digest('hex')
  }
}
