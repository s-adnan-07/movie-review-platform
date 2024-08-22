import { Module } from '@nestjs/common'
import { MovieEntity } from '@/shared'
import { MoviesController } from './movies.controller'
import { MoviesService } from './movies.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ReviewsModule } from '../reviews/reviews.module'
import { ReviewsService } from '../reviews/reviews.service'

@Module({
  imports: [ReviewsModule, TypeOrmModule.forFeature([MovieEntity])],
  controllers: [MoviesController],
  providers: [MoviesService, ReviewsService],
})
export class MoviesModule {}
