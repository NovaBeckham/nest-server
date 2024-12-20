/*
 * @Description:
 * @Author: hyx
 * @Date: 2024-12-03 16:27:09
 */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('t_operation_log', { schema: 'aurora' })
export class OperationLog {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: '主键id' })
  id: number

  @Column('varchar', {
    name: 'opt_module',
    nullable: true,
    comment: '操作模块',
    length: 20
  })
  optModule: string | null

  @Column('varchar', {
    name: 'opt_type',
    nullable: true,
    comment: '操作类型',
    length: 20
  })
  optType: string | null

  @Column('varchar', { name: 'opt_uri', comment: '操作url', length: 255 })
  optUri: string

  @Column('varchar', { name: 'opt_method', comment: '操作方法', length: 255 })
  optMethod: string | null

  @Column('varchar', {
    name: 'opt_desc',
    nullable: true,
    comment: '操作描述',
    length: 255
  })
  optDesc: string | null

  @Column('longtext', { name: 'request_param', comment: '请求参数' })
  requestParam: string

  @Column('varchar', {
    name: 'request_method',
    comment: '请求方式',
    length: 20
  })
  requestMethod: string

  @Column('longtext', {
    name: 'response_data',
    nullable: true,
    comment: '返回数据'
  })
  responseData: string | null

  @Column('int', { name: 'user_id', comment: '用户id' })
  userId: number

  @Column('varchar', { name: 'nickname', comment: '用户昵称', length: 50 })
  nickname: string

  @Column('varchar', {
    name: 'ip_address',
    nullable: true,
    comment: '操作ip',
    length: 255
  })
  ipAddress: string | null

  @Column('varchar', {
    name: 'ip_source',
    nullable: true,
    comment: '操作地址',
    length: 255
  })
  ipSource: string | null

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
