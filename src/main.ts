/*
 * @Description:
 * @Author: hyx
 * @Date: 2024-10-18 14:25:57
 */

import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Response } from './common/response'
import { ValidationPipe } from '@nestjs/common'
import { HttpFilter } from './common/filter'
import { ExceptionLogService } from './api/exception/exception.service'
import helmet from 'helmet'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const exceptionLogService = app.get(ExceptionLogService)

  app.useGlobalInterceptors(new Response())

  app.useGlobalFilters(new HttpFilter(exceptionLogService))

  app.useGlobalPipes(new ValidationPipe())

  app.use(helmet())

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
