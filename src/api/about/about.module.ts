/*
 * @Description:
 * @Author: hyx
 * @Date: 2024-10-18 15:52:18
 */

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { About } from './entities/about.entity'
import { AboutController } from './about.controller'
import { AboutService } from './about.service'

@Module({
  imports: [TypeOrmModule.forFeature([About])],
  controllers: [AboutController],
  providers: [AboutService]
})
export class AboutModule {}
