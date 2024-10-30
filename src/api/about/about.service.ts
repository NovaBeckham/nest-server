/*
 * @Description:
 * @Author: hyx
 * @Date: 2024-10-18 15:33:04
 */

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { About } from './entities/about.entity'
import { Repository } from 'typeorm'
import { CreateAboutDto } from './dto/createAbout.dto'
import { UpdateAboutDto } from './dto/updateAbout.dto'

@Injectable()
export class AboutService {
  constructor(@InjectRepository(About) private readonly aboutRepository: Repository<About>) {}

  create(CreateAboutDto: CreateAboutDto) {
    return 'This action adds a new about'
  }

  findAll() {
    const data = this.aboutRepository.find()
    return data
  }

  findOne(id: number) {
    return `This action returns a #${id} about`
  }

  update(id: number, updateAboutDto: UpdateAboutDto) {
    return `This action updates a #${id} about`
  }

  remove(id: number) {
    return `This action removes a #${id} about`
  }
}
