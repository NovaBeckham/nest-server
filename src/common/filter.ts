/*
 * @Description:
 * @Author: hyx
 * @Date: 2024-10-18 14:23:06
 */

import { ExceptionLog } from '@/api/exception/entities/exception.entity'
import { ExceptionLogService } from '@/api/exception/exception.service'
import { objectToString } from '@/utils/objectToString'
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Injectable } from '@nestjs/common'
import { Request, Response } from 'express'

@Catch(HttpException)
@Injectable()
export class HttpFilter implements ExceptionFilter {
  constructor(private readonly exceptionLogService: ExceptionLogService) {} // 使用 @Inject() 装饰器注入

  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const request = ctx.getRequest<Request>()
    const response = ctx.getResponse<Response>()
    const status = exception.getStatus()
    const message = exception.getResponse().valueOf()

    const exceptionLog = new ExceptionLog()
    exceptionLog.optUri = request.url
    exceptionLog.optMethod = request.method
    exceptionLog.exceptionInfo = typeof message == 'object' ? JSON.stringify(message) : message
    exceptionLog.ipAddress = request.ip.replace('::ffff:', '')
    exceptionLog.requestParam = objectToString(request.params)

    await this.exceptionLogService.create(exceptionLog)

    response.status(status).json({
      success: false,
      time: new Date(),
      data: exception.getResponse(),
      message,
      status,
      path: request.url
    })
  }
}
