/*
 * @Description:
 * @Author: hyx
 * @Date: 2024-10-18 16:45:04
 */

import { PartialType } from '@nestjs/mapped-types'
import { CreateRedisDto } from './createRedis.dto'

export class UpdateRedsiDto extends PartialType(CreateRedisDto) {}
