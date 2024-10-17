/*
 * @Description:
 * @Author: hyx
 * @Date: 2024-10-17 17:04:49
 */

export const environment = process.env.NODE_ENV
export const isDevEnv = Object.is(environment, 'development')
export const isProdEnv = Object.is(environment, 'production')
export const isTestEnv = Object.is(environment, 'test')

export default {
  isDevEnv,
  isProdEnv,
  isTestEnv,
  environment
}
