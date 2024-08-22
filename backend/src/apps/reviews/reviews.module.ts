import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ReviewEntity } from '@/shared'
import { ReviewsService } from './reviews.service'

@Module({
  imports: [TypeOrmModule.forFeature([ReviewEntity])],
  providers: [ReviewsService],
  exports: [TypeOrmModule, ReviewsService],
})
export class ReviewsModule {}
