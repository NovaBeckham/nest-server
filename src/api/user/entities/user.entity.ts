/*
 * @Description:
 * @Author: hyx
 * @Date: 2024-10-18 16:55:52
 */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('t_user_info', { schema: 'aurora' })
export class UserInfo {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: '用户ID' })
  id: number

  @Column('varchar', {
    name: 'email',
    nullable: true,
    comment: '邮箱号',
    length: 50
  })
  email: string | null

  @Column('varchar', { name: 'nickname', comment: '用户昵称', length: 50 })
  nickname: string

  @Column('varchar', { name: 'password', comment: '密码', length: 255, select: false })
  password: string

  @Column('varchar', { name: 'avatar', comment: '用户头像', length: 1024 })
  avatar: string

  @Column('varchar', {
    name: 'intro',
    nullable: true,
    comment: '用户简介',
    length: 255
  })
  intro: string | null

  @Column('varchar', {
    name: 'website',
    nullable: true,
    comment: '个人网站',
    length: 255
  })
  website: string | null

  @Column('tinyint', {
    name: 'is_subscribe',
    nullable: true,
    comment: '是否订阅',
    width: 1
  })
  isSubscribe: boolean | null

  @Column('tinyint', {
    name: 'is_disable',
    comment: '是否禁用',
    width: 1,
    default: () => "'0'"
  })
  isDisable: boolean

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
}
