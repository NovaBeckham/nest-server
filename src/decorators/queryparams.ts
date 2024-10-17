/*
 * @Description:
 * @Author: hyx
 * @Date: 2024-10-17 15:06:48
 */

import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Request } from 'express'

interface QueryVisitor {
  ip: string | null
  ua?: string
  origin?: string
  referer?: string
}

interface QueryCookies {
  [key: string]: string
}

export interface QueryParamsResult {
  /** 管理员角色状态 */
  isAuthenticated: boolean
  isUnauthenticated: boolean
  /** 原始路由参数 */
  params: Record<string, string>
  /** 原始查询参数 */
  query: Record<string, string>
  /** 访客Cookie */
  cookies: QueryCookies
  /** 访客信息 */
  visitor: QueryVisitor
  /** 原始请求 */
  request: Request
}

/**
 * @function QueryParams
 * @example `@QueryParams()`
 * @example `@QueryParams('query')`
 */
export const QueryParams = createParamDecorator(
  (field: keyof QueryParamsResult, context: ExecutionContext): QueryParamsResult => {
    const request = context.switchToHttp().getRequest<Request>()

    const isAuthenticated = request.isAuthenticated()
    const isUnauthenticated = request.isUnauthenticated()

    const ip =
      (request.headers['x-forwarded-for'] as string) ||
      (request.headers['x-real-ip'] as string) ||
      request.socket.remoteAddress ||
      request.ip ||
      request.ips[0]

    const visitor: QueryVisitor = {
      ip: ip.replace('::ffff:', '').replace('::1', '') || null,
      ua: request.headers['user-agent'],
      origin: request.headers.origin,
      referer: request.headers.referer
    }

    const result = {
      isAuthenticated,
      isUnauthenticated,
      params: request.params,
      query: request.query as any,
      cookies: request.cookies,
      visitor,
      request
    }

    return field ? result[field] : result
  }
)
