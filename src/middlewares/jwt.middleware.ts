/*
 * @Description:
 * @Author: hyx
 * @Date: 2024-12-03 16:07:48
 */

import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import { tokenError } from '../common/exception'
import { jwtConstants } from '@/constants/jwt'

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1] // Assuming JWT is sent in Authorization header
    if (token) {
      try {
        const decodedToken = verify(token, jwtConstants.secret, { ignoreExpiration: true })
        req.user = {
          userId: decodedToken.sub,
          // @ts-ignore
          nickname: decodedToken.nickname
        } // Store the decoded token in req.user
      } catch (error) {
        // Handle token verification error
        throw new tokenError('token过期或token错误，请重新登录')
      }
    }

    next()
  }
}
