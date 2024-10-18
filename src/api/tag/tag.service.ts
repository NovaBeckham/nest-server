/*
 * @Description:
 * @Author: hyx
 * @Date: 2024-10-18 16:42:12
 */

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Tag } from './entities/tag.entity'
import { ArticleService } from '@/api/article/article.service'

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
    private readonly articleService: ArticleService
  ) {}

  create(tag: Tag) {
    const data = this.tagRepository.save(tag)
    return data
  }

  async findAll() {
    const data = await this.tagRepository.find()
    for (let i = 0; i < data.length; i++) {
      data[i].cnt = await this.articleService.getArticleCntByTag(data[i].id)
    }
    return data
  }

  findOne(id: number) {
    const data = this.tagRepository.find({ where: { id } })
    return data
  }

  remove(id: number) {
    const data = this.tagRepository.delete(id)
    return data
  }
}
