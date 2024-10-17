/*
 * @Description:
 * @Author: hyx
 * @Date: 2024-10-17 15:25:25
 */

import passport from 'passport'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(passport.initialize())
  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
