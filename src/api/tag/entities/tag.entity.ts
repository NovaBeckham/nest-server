/*
 * @Description:
 * @Author: hyx
 * @Date: 2024-10-18 16:39:04
 */

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Article } from '@/api/article/entities/article.entity'

@Entity('t_tag', { schema: 'nova' })
export class Tag {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number

  @Column('varchar', { name: 'tag_name', comment: '标签名', length: 20 })
  tagName: string

  @Column('datetime', {
    name: 'create_time',
    comment: '创建时间',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createTime: Date

  @Column('datetime', {
    name: 'update_time',
    nullable: true,
    comment: '更新时间',
    default: () => 'CURRENT_TIMESTAMP'
  })
  updateTime: Date | null

  @OneToMany(() => Article, (article) => article.tag)
  articles: Article[]

  cnt: number
}
