import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ReviewEntity } from '@/shared'
import { ReviewsService } from './reviews.service'
import { ReviewsController } from './reviews.controller'

@Module({
  imports: [TypeOrmModule.forFeature([ReviewEntity])],
  providers: [ReviewsService],
  exports: [TypeOrmModule, ReviewsService],
  controllers: [ReviewsController],
})
export class ReviewsModule {}
