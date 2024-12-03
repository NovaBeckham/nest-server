/*
 * @Description:
 * @Author: hyx
 * @Date: 2024-12-03 15:09:45
 */

export const environment = process.env.NODE_ENV
export const isDevEnv = Object.is(environment, 'development')
export const isProdEnv = Object.is(environment, 'production')

export default {
  isDevEnv,
  isProdEnv,
  environment
}
