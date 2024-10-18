/*
 * @Description:
 * @Author: hyx
 * @Date: 2024-10-18 16:36:15
 */

import { PartialType } from '@nestjs/mapped-types'
import { CreateTagDto } from './create-tag.dto'

export class UpdateTagDto extends PartialType(CreateTagDto) {}
