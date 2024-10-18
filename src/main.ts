/*
 * @Description:
 * @Author: hyx
 * @Date: 2024-10-18 14:25:57
 */

import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Response } from './common/response'
import { HttpFilter } from './common/filter'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {

  const app = await NestFactory.create(AppModule)

  app.useGlobalInterceptors(new Response())

  app.useGlobalFilters(new HttpFilter())

  app.useGlobalPipes(new ValidationPipe)

  await app.listen(process.env.PORT ?? 3000)

}
bootstrap()
