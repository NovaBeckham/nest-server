/*
 * @Description:
 * @Author: hyx
 * @Date: 2024-10-17 17:52:40
 */

import { prop } from '@typegoose/typegoose'
import { IsDefined, IsOptional, IsString } from 'class-validator'

export const DEFAULT_ADMIN_PROFILE = Object.freeze<Admin>({
  name: '',
  slogan: '',
  avatar: ''
})

export class Admin {
  @IsString({ message: "what's your name?" })
  @IsDefined()
  @prop({ required: true })
  name: string

  @IsString()
  @IsDefined()
  @prop({ required: true })
  slogan: string

  @IsString()
  @IsOptional()
  @prop({ default: '' })
  avatar: string

  @IsString()
  @prop({ select: false })
  password?: string
}
