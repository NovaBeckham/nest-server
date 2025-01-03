declare namespace CommonType {
  /** 全局响应体 */
  type Response<T = any> = {
    code: number // 状态码
    data?: T // 业务数据
    msg: string // 响应信息
    timestamp: number // 时间戳
  }

  /** 存储信息 */
  type SessionInfo = {
    /** 验证码 */
    captchaCode: string
    userInfo: import('@prisma/client').User
  }

  /** token 生成信息 */
  type TokenPayload = {
    sub: string
  } & Pick<import('@prisma/client').User, 'userName'>
}
