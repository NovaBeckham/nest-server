import { responseMessage } from '@/utils'
import { LoginParamsDto } from './dto/params-auth.dto'
import { Status, User } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import bcrypt from 'bcrypt'
import { isNil } from 'ramda'
import { JwtService } from '@nestjs/jwt'

export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(params: LoginParamsDto, session: CommonType.SessionInfo, ip: string) {
    const { captchaCode } = params

    // 判断验证码
    if (captchaCode.toUpperCase() !== session.captchaCode.toUpperCase()) {
      return responseMessage(null, '验证码错误', -1)
    }

    // 登录参数校验结果
    const user = await this.validateUser(params)

    if (isNil(user)) {
      return responseMessage(null, '用户名或密码错误', -1)
    }

    // 判断用户是否禁用
    if (user.status === Status.INACTIVE) {
      return responseMessage(null, '该用户已被禁用', -1)
    }

    const tokens = await this.generateTokens(user)

    const userInfo = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        loginCount: { increment: 1 },
        lastLoginAt: new Date(),
        lastIp: ip,
        token: tokens.token,
      },
    })

    session.userInfo = userInfo

    return responseMessage<Pick<User, 'token'>>(tokens)
  }

  /**
   * @description: 验证用户登录
   */
  async validateUser(params: LoginParamsDto): Promise<User | null> {
    const { userName, password } = params

    const userInfo = await this.prisma.user.findUnique({
      where: { userName },
    })

    const checkPwd = await this.comparePassword(password, userInfo.password)

    if (userInfo && checkPwd) {
      return userInfo
    }
    return null
  }

  async generateTokens(userInfo: User): Promise<Pick<User, 'token'>> {
    const payload: CommonType.TokenPayload = { userName: userInfo.userName, sub: userInfo.id }

    const token = this.jwtService.sign(payload, { expiresIn: '3d' }) // 设置访问 token 的过期时间为 3 天

    return { token }
  }

  /**
   * @description: 用于验证用户提供的密码是否与数据库中存储的哈希密码匹配
   */
  async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword)
  }
}
