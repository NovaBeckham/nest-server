import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Request } from 'express'
import { PrismaService } from '../prisma/prisma.service'
import { UnauthorizedException } from '@nestjs/common'

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
    })
  }

  async validate(req: Request, payload: CommonType.TokenPayload) {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req)
    if (!token) {
      throw new UnauthorizedException('未登录')
    }
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    })
    if (!user) {
      throw new UnauthorizedException('token令牌非法，请重新登录')
    }
    return payload
  }
}
