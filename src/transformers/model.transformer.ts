/*
 * @Description:
 * @Author: hyx
 * @Date: 2024-10-17 17:29:58
 */

import { DB_MODEL_TOKEN_SUFFIX } from '@/constants/system'
import { Inject } from '@nestjs/common'

export interface TypegooseClass {
  new (...args: any[])
}

export function getModelToken(modelName: string): string {
  return modelName + DB_MODEL_TOKEN_SUFFIX
}

export function InjectModel(model: TypegooseClass) {
  return Inject()
}
