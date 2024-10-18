/*
 * @Description:
 * @Author: hyx
 * @Date: 2024-10-18 16:41:43
 */

import { Module } from '@nestjs/common'
import { TagService } from './tag.service'
import { TagController } from './tag.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Tag } from './entities/tag.entity'
import { Share } from '@/utils/share'
import { ArticleModule } from '@/api/article/article.module'

@Module({
  imports: [TypeOrmModule.forFeature([Tag]), ArticleModule, Share],
  controllers: [TagController],
  providers: [TagService],
  exports: [TagService]
})
export class TagModule {}
