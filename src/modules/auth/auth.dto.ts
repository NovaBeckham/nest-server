/*
 * @Description:
 * @Author: hyx
 * @Date: 2024-10-17 18:06:52
 */

import { IsDefined, IsNotEmpty, IsString } from 'class-validator'

export class AuthLoginDTO {
  @IsString({ message: 'password must be string type' })
  @IsNotEmpty({ message: 'password?' })
  @IsDefined()
  password: string
}
