/*
 * @Description:
 * @Author: hyx
 * @Date: 2024-10-18 15:41:18
 */

import { Controller, Body, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { AboutService } from './about.service'
import { CreateAboutDto } from './dto/createAbout.dto'
import { Result } from '@/common/result'
import { UpdateAboutDto } from './dto/updateAbout.dto'

@Controller('about')
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  @Post()
  create(@Body() createAboutDto: CreateAboutDto) {
    return this.aboutService.create(createAboutDto)
  }

  async findAll() {
    return new Result(await this.aboutService.findAll())
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aboutService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAboutDto: UpdateAboutDto) {
    return this.aboutService.update(+id, updateAboutDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aboutService.remove(+id)
  }
}
