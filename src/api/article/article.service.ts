/*
 * @Description:
 * @Author: hyx
 * @Date: 2024-10-18 16:48:07
 */

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Article } from './entities/article.entity'
import { Repository } from 'typeorm'
import { getCurrentFormattedTime } from '@/utils/getCurrentFormattedTime'

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>
  ) {}

  async create(article: Article) {
    article.updateTime = getCurrentFormattedTime()
    const data = await this.articleRepository.save(article)

    return data
  }

  async findPage(
    pageNum: number,
    pageSize: number,
    articleTitle: string,
    articleContent: string,
    tagId: string,
    categoryId: string,
    type: string
  ) {
    const queryBuilder = await this.articleRepository
      .createQueryBuilder('article')
      .leftJoin('article.tag', 'tag')
      .leftJoin('article.userinfo', 'userinfo')
      .where('article.articleTitle LIKE :articleTitle', {
        articleTitle: `%${articleTitle}%`
      })
      .andWhere('article.articleContent LIKE :articleContent', {
        articleContent: `%${articleContent}%`
      })
      .andWhere('article.tagId LIKE :tagId', {
        tagId: `%${tagId}%`
      })
      // .andWhere('article.categoryId LIKE :categoryId',{
      //   categoryId:`%%`
      // })
      .andWhere('article.type LIKE :type', {
        type: `%${type}%`
      })
      .andWhere('article.isDelete=:isDelete', { isDelete: 0 })
    const data = await queryBuilder
      .select()
      .addSelect(['tag.tagName', 'tag.id'])
      .addSelect(['userinfo.nickname', 'userinfo.avatar'])
      .orderBy('article.id', 'DESC')
      .skip((pageNum - 1) * pageSize)
      .take(pageSize)
      .getMany()
    const total = await queryBuilder.getCount()
    return { records: data, total, pageSize, pageNum }
  }

  getRecentArticle() {
    const data = this.articleRepository
      .createQueryBuilder('article')
      .select(['article.id', 'article.articleTitle', 'article.views'])
      .take(6)
      .orderBy('article.id', 'DESC')
      .getMany()
    return data
  }
  async findAll() {
    const data = this.articleRepository
      .createQueryBuilder('article')
      .select()
      .leftJoin('article.tag', 'tag')
      .addSelect('tag.tagName')
      .leftJoin('article.userinfo', 'userinfo')
      .addSelect(['userinfo.nickname', 'userinfo.avatar'])
      .andWhere('article.isDelete=:isDelete', { isDelete: 0 })
      .orderBy('article.id', 'DESC')
      .getMany()

    return data
  }

  findOne(id: number) {
    const data = this.articleRepository
      .createQueryBuilder('article')
      .select()
      .leftJoin('article.tag', 'tag')
      .addSelect('tag.tagName')
      .leftJoin('article.userinfo', 'userinfo')
      .addSelect(['userinfo.nickname', 'userinfo.avatar'])
      .where('article.id=:id', { id })
      .andWhere('article.isDelete=:isDelete', { isDelete: 0 })
      .getOne()
    return data
  }

  update(article: Article) {
    const {
      id,
      categoryId,
      articleCover,
      articleTitle,
      articleContent,
      isTop,
      isFeatured,
      isDelete,
      status,
      type,
      password,
      originalUrl,
      tagId
    } = article
    const data = this.articleRepository
      .createQueryBuilder()
      .update(Article)
      .set({
        categoryId,
        articleCover,
        articleTitle,
        articleContent,
        isTop,
        isFeatured,
        isDelete,
        status,
        type,
        password,
        originalUrl,
        tagId
      })
      .where('id=:id', { id })
      .execute()
    return data
  }

  remove(id: number) {
    const data = this.articleRepository
      .createQueryBuilder()
      .update(Article)
      .set({
        isDelete: true
      })
      .where('id=:id', { id })
      .execute()
    return data
  }

  async getArticleCntByTag(tagId: number) {
    const data = await this.articleRepository.query(`select count(*) cnt from t_article where tag_id=?`, [tagId])
    return data[0].cnt
  }
}
