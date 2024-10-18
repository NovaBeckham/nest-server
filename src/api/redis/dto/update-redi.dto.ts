/*
 * @Description:
 * @Author: hyx
 * @Date: 2024-10-18 16:45:04
 */

import { PartialType } from '@nestjs/mapped-types'
import { CreateRediDto } from './create-redi.dto'

export class UpdateRediDto extends PartialType(CreateRediDto) {}
