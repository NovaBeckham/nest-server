import { RESPONSE_CODE, RESPONSE_MSG } from '@/enums'
import dayjs from 'dayjs'
import { Request } from 'express'

/** 统一返回体 */
export const responseMessage = <T = any>(
  data,
  msg: string = RESPONSE_MSG.SUCCESS,
  code: number = RESPONSE_CODE.SUCCESS,
): CommonType.Response<T> => ({ data, msg, code, timestamp: dayjs().valueOf() })

/**
 * @description: 获取客户端真实 IP
 * @param {Request} req
 */
export const getRealIp = (req: Request): string => {
  const result = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.socket.remoteAddress || req.ip
  return Array.isArray(result) ? result[0] : result
}
