/*
 * @Description:
 * @Author: hyx
 * @Date: 2024-12-03 18:06:58
 */

import { jwtConstants } from '@/constants/jwt'
import { Injectable } from '@nestjs/common'
import { sign, verify } from 'jsonwebtoken'

@Injectable()
export class RefreshTokenService {
  generateToken(payload: any): string {
    const token = sign(payload, jwtConstants.refreshSecret, { expiresIn: '7d' })
    return token
  }

  verifyToken(token: string): any {
    try {
      const decoded = verify(token, jwtConstants.refreshSecret)
      return decoded
    } catch (error) {
      throw new Error('Invalid token')
    }
  }
}
