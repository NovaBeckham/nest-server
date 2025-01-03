import { Injectable, Logger, NestMiddleware } from '@nestjs/common'
import dayjs from 'dayjs'
import { NextFunction, Request, Response } from 'express'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger()
  use(req: Request, res: Response, next: NextFunction) {
    // 记录开始时间
    const start = Date.now()
    // 获取请求信息
    const { method, originalUrl, ip, httpVersion, headers } = req
    // 获取响应信息
    const { statusCode } = res

    res.on('finish', () => {
      const end = Date.now()
      const duration = end - start
      const logFormat = `${dayjs().valueOf()} ${method} ${originalUrl} HTTP/${httpVersion} ${ip} ${statusCode} ${duration}ms ${headers['user-agent']}`
      if (statusCode >= 500) {
        this.logger.error(logFormat, originalUrl)
      } else if (statusCode >= 400) {
        this.logger.warn(logFormat, originalUrl)
      } else {
        this.logger.log(logFormat, originalUrl)
      }
    })

    next()
  }
}
