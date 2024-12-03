/*
 * @Description:
 * @Author: hyx
 * @Date: 2024-12-03 16:25:59
 */

import { Injectable } from '@nestjs/common'
import { OperationLog } from './entities/operation.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class OperationLogService {
  constructor(@InjectRepository(OperationLog) private readonly OperationRepository: Repository<OperationLog>) {}

  create(operationLog: OperationLog) {
    const data = this.OperationRepository.save(operationLog)
    return data
  }

  findAll() {
    const data = this.OperationRepository.find()
    return data
  }

  async findPage(pageNum: number, pageSize: number, url: string, method: string) {
    const totalResult = await this.OperationRepository.query(
      'select count(*) as total from t_operation_log  where opt_uri like ? and request_method like ? ',
      [`%${url}%`, `%${method}%`]
    )

    const data = await this.OperationRepository.query(
      'select * from t_operation_log  where opt_uri like ? and request_method like ? order by id desc limit ?,?',
      [`%${url}%`, `%${method}%`, (pageNum - 1) * pageSize, pageSize]
    )

    return { records: data, total: Number(totalResult[0].total), pageSize, pageNum }
  }

  findOne(id: number) {
    return `This action returns a #${id} operationLog`
  }

  remove(id: number) {
    const data = this.OperationRepository.delete(id)
    return data
  }

  removeLogs(ids: number[]) {
    const data = this.OperationRepository.delete(ids)
    return data
  }
}
