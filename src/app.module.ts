/*
 * @Description:
 * @Author: hyx
 * @Date: 2024-10-18 16:58:36
 */

import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AboutModule } from './api/about/about.module'
import { UserInfoModule } from './api/user/user.module'
import { TagModule } from './api/tag/tag.module'
import { ArticleModule } from './api/article/article.module'
import { RedisModule } from './api/redis/redis.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DATABASE_HOST', 'localhost'), // 从环境变量获取，如果不存在则默认为 'localhost'
        port: configService.get<number>('DATABASE_PORT', 3306), // 从环境变量获取，如果不存在则默认为 3306
        username: configService.get<string>('DATABASE_USERNAME', 'root'), // 从环境变量获取，如果不存在则默认为 'root'
        password: configService.get<string>('DATABASE_PASSWORD', 'admin5698'), // 从环境变量获取，如果不存在则默认为 '123456'
        database: configService.get<string>('DATABASE_NAME', 'nova'), // 从环境变量获取，如果不存在则默认为 'aurora'
        entities: [__dirname + '/**/**/*.entity{.ts,.js}'],
        retryDelay: 500,
        retryAttempts: 10,
        autoLoadEntities: true
      }),
      inject: [ConfigService] // 注入 ConfigService 依赖
    }),
    AboutModule,
    UserInfoModule,
    TagModule,
    ArticleModule,
    RedisModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
