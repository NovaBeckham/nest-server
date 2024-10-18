/*
 * @Description:
 * @Author: hyx
 * @Date: 2024-10-18 16:50:20
 */

import { AuthGuard } from '@nestjs/passport'

export class JwtGuard extends AuthGuard('jwt') {
  constructor() {
    super()
  }
}
