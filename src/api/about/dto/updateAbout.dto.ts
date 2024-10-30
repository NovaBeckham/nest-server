/*
 * @Description:
 * @Author: hyx
 * @Date: 2024-10-18 15:30:19
 */

import { PartialType } from '@nestjs/mapped-types'
import { CreateAboutDto } from './createAbout.dto'

export class UpdateAboutDto extends PartialType(CreateAboutDto) {}
