/*
 * @Description:
 * @Author: hyx
 * @Date: 2024-10-17 17:25:53
 */

import { MongooseModel } from '@/interfaces/mongoose'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Admin } from './auth.model'
import { InjectModel } from '@/transformers/model.transformer'
import { UNDEFINED } from '@/constants/value'
import { decodeBase64, decodeMD5 } from '@/transformers/codec.transformer'
import { AUTH } from '@/app.config'
import { TokenResult } from './auth.interface'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(Admin) private readonly authModel: MongooseModel<Admin>
  ) {}

  private async getExistedPassword(): Promise<string> {
    const auth = await this.authModel.findOne(UNDEFINED, '+password').exec()
    return auth?.password || decodeMD5(AUTH.defaultPassword)
  }

  public createToken(): TokenResult {
    return {
      access_token: this.jwtService.sign({ data: AUTH.data }),
      expires_in: AUTH.expiresIn as number
    }
  }

  public async adminLogin(password: string) {
    const existedPassword = await this.getExistedPassword()
    const loginPassword = decodeMD5(decodeBase64(password))
    if (loginPassword === existedPassword) {
      return this.createToken()
    } else {
      throw 'Password incorrect'
    }
  }
}
