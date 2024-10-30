/*
 * @Description:
 * @Author: hyx
 * @Date: 2024-10-18 16:47:02
 */

import { PartialType } from '@nestjs/mapped-types'
import { CreateUserInfoDto } from './createUser.dto'

export class UpdateUserInfoDto extends PartialType(CreateUserInfoDto) {}
