/*
 * @Description:
 * @Author: hyx
 * @Date: 2024-10-17 16:21:54
 */

export function getMessageFromNormalError(error: any): any {
  return error?.message || error
}

export function getMessageFromAxiosError(error: any): any {
  return error?.response?.data || getMessageFromNormalError(error)
}
