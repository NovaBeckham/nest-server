/*
 * @Description:
 * @Author: hyx
 * @Date: 2024-10-17 17:56:49
 */

import { createHash } from 'crypto'
import { Base64 } from 'js-base64'

/** Base64 */
export function decodeBase64(value: string): string {
  return value ? Base64.decode(value) : value
}

/** md5 */
export function decodeMD5(value: string): string {
  return createHash('md5').update(value).digest('hex')
}
