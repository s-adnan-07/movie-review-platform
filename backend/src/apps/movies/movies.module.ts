import { Module } from '@nestjs/common'
import { MovieEntity } from '@/shared'
import { MoviesController } from './movies.controller'
import { MoviesService } from './movies.service'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity])],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
