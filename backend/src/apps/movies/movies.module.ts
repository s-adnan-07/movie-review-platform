import { Module } from '@nestjs/common'
import { MovieEntity } from '@/shared'
import { MoviesController } from './movies.controller'
import { MoviesService } from './movies.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ReviewsModule } from '../reviews/reviews.module'
import { ReviewsService } from '../reviews/reviews.service'
import { UsersModule } from '../users/users.module'
import { UsersService } from '../users/users.service'

@Module({
  imports: [
    ReviewsModule,
    UsersModule,
    TypeOrmModule.forFeature([MovieEntity]),
  ],
  controllers: [MoviesController],
  providers: [MoviesService, ReviewsService, UsersService],
})
export class MoviesModule {}
