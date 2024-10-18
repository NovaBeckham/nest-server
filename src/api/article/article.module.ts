/*
 * @Description:
 * @Author: hyx
 * @Date: 2024-10-18 16:48:13
 */

import { Module } from '@nestjs/common'
import { ArticleService } from './article.service'
import { ArticleController } from './article.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Article } from './entities/article.entity'
import { Share } from '@/utils/share'

@Module({
  imports: [TypeOrmModule.forFeature([Article]), Share],
  controllers: [ArticleController],
  providers: [ArticleService],
  exports: [ArticleService]
})
export class ArticleModule {}
