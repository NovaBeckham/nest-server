/*
 * @Description:
 * @Author: hyx
 * @Date: 2024-12-03 18:08:02
 */

import { Controller } from '@nestjs/common'
import { RefreshTokenService } from './refresh-token.service'

@Controller('refresToken')
export class RefresTokenController {
  constructor(private readonly refreshTokenService: RefreshTokenService) {}
}
