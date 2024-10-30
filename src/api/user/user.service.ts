/*
 * @Description:
 * @Author: hyx
 * @Date: 2024-10-18 16:57:36
 */

import { Injectable } from '@nestjs/common'
import { UserInfo } from './entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class UserInfoService {
  constructor(
    @InjectRepository(UserInfo)
    private readonly userRepository: Repository<UserInfo>
  ) {}

  async create(userInfo: UserInfo) {
    const data = await this.userRepository.save(userInfo)
    return data
  }

  async update(userInfo: UserInfo) {
    const data = await this.userRepository.save(userInfo)
    return data
  }

  async isExistUser(nickname: string) {
    const res = await this.userRepository
      .createQueryBuilder('userinfo')
      .select()
      .addSelect('userinfo.password')
      .leftJoin('userinfo.userRole', 'role')
      .addSelect(['role.id', 'role.roleName'])
      .where('userinfo.nickname=:nickname', { nickname })
      .getOne()
    return res
  }

  findAll() {
    const data = this.userRepository.find()
    return data
  }

  async findAllByPage(pageNum: number, pageSize: number, nickname: string) {
    const queryBuilder = await this.userRepository
      .createQueryBuilder('userinfo')
      .leftJoin('userinfo.userRole', 'role')
      .addSelect(['role.id', 'role.roleName'])
      .where('userinfo.nickname LIKE :nickname', {
        nickname: `%${nickname}%`
      })

    const data = await queryBuilder
      .select()
      .orderBy('userinfo.id', 'DESC')
      .skip((pageNum - 1) * pageSize)
      .take(pageSize)
      .getMany()
    const total = await queryBuilder.getCount()
    return { records: data, total, pageSize, pageNum }
  }

  async findOne(id: number) {
    const data = await this.userRepository
      .createQueryBuilder('user')
      .leftJoin('user.userRole', 'role')
      .addSelect(['role.id', 'role.roleName'])
      .where('user.id=:id', { id })
      .getOne()

    return { userinfo: data }
  }

  remove(id: number, flag: number) {
    const data = this.userRepository.query('update t_user_info set is_disable=? where id =?', [flag, id])
    return data
  }
}
