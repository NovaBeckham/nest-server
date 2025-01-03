import { IsNotEmpty } from 'class-validator'

export class LoginParamsDto {
  @IsNotEmpty({ message: '用户名必填' })
  userName: string

  @IsNotEmpty({ message: '密码必填' })
  password: string

  @IsNotEmpty({ message: '验证码必填' })
  captchaCode: string
}
