/*
 * @Description:
 * @Author: hyx
 * @Date: 2024-12-03 15:55:02
 */

export const objectToString = (obj: any) => {
  const keyValuePairs = Object.entries(obj).map(([key, value]) => `${key}:${value}`)
  return keyValuePairs.join('/')
}
