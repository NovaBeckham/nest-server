/*
 * @Description:
 * @Author: hyx
 * @Date: 2024-10-18 11:54:51
 */

import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { map, Observable } from 'rxjs'

interface Data<T> {
  data: T
}

@Injectable()
export class Response<T> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<Data<T>> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((result) => {
        return {
          data: result.data,
          status: result.status,
          message: result.message,
          success: result.success
        }
      })
    )
  }
}
