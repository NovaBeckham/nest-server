/*
 * @Description:
 * @Author: hyx
 * @Date: 2024-10-18 16:58:36
 */

import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserInfoModule } from './api/user/user.module'
import { RedisModule } from './api/redis/redis.module'
import { AuthModule } from './api/auth/auth.module'
import { LoggerModule } from './api/logger/logger.module'
import { ExceptionLogModule } from './api/exception/exception.module'
import { OperationLogModule } from './api/operation/operation.module'
import { JwtMiddleware } from './middlewares/jwt.middleware'
import { LoggerMiddleware } from './middlewares/logger.middleware'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [__dirname + '/**/**/*.entity{.ts,.js}'],
        retryDelay: 500,
        retryAttempts: 10,
        autoLoadEntities: true
      }),
      inject: [ConfigService] // 注入 ConfigService 依赖
    }),
    UserInfoModule,
    RedisModule,
    AuthModule,
    LoggerModule,
    ExceptionLogModule,
    OperationLogModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes(
      { path: 'userInfo/self', method: RequestMethod.ALL },
      {
        path: 'talkcomment',
        method: RequestMethod.ALL
      },
      { path: 'comment', method: RequestMethod.ALL }
    ) //解析请求的token
    consumer.apply(LoggerMiddleware).forRoutes(
      { path: '*', method: RequestMethod.POST },
      {
        path: '*',
        method: RequestMethod.DELETE
      }
    )
  }
}
