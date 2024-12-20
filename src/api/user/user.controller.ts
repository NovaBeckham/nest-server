/*
 * @Description:
 * @Author: hyx
 * @Date: 2024-10-18 16:56:22
 */

import { Controller, Get, Post, Body, ParseIntPipe, Param, Query, Delete, UseGuards, Req } from '@nestjs/common'
import { UserInfoService } from './user.service'
import { Result } from '@/common/result'
import { UserInfo } from './entities/user.entity'
import { AdminGuard } from '@/guards/admin/admin.guard'
import { JwtGuard } from '@/guards/jwt/jwt.guard'

@Controller('userInfo')
export class UserInfoController {
  constructor(private readonly userInfoService: UserInfoService) {}

  @Post()
  @UseGuards(JwtGuard, AdminGuard)
  async create(@Body() userInfo: UserInfo) {
    return new Result(await this.userInfoService.create(userInfo))
  }

  @Post('update')
  @UseGuards(JwtGuard, AdminGuard)
  async update(@Body() userInfo: UserInfo) {
    return new Result(await this.userInfoService.update(userInfo))
  }

  @Get()
  async findAll() {
    return new Result(await this.userInfoService.findAll())
  }

  // @UseGuards(JwtGuard)
  @Get('self')
  async getUserinfoSelf(@Req() res: any) {
    const userId = res.user.userId

    const data = await this.userInfoService.findOne(userId)

    return new Result(data)
  }

  @Get('/page')
  async findAllByPage(
    @Query('pageNum', new ParseIntPipe()) pageNum: number,
    @Query('pageSize', new ParseIntPipe()) pageSize: number,
    @Query('nickname') nickname: string
  ) {
    return new Result(await this.userInfoService.findAllByPage(pageNum, pageSize, nickname))
  }

  @Get(':id')
  // @UseInterceptors(SerializeInterceptor)
  async findOne(@Param('id') id: string, @Req() req) {
    const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress

    return new Result(await this.userInfoService.findOne(+id))
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Delete(':id/:flag')
  async remove(@Param('id') id: string, @Param('flag') flag: string) {
    return new Result(await this.userInfoService.remove(+id, +flag))
  }
}
