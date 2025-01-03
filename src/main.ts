import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import session from 'express-session'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.use(
    session({
      secret: 'nova', // 签名
      resave: false, // 强制保存 sseion 即使它并没有变化，默认为true
      saveUninitialized: false, // 强制将未初始化的 session 存储
    }),
  )

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
