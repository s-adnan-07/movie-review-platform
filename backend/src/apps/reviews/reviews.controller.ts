import {
  Body,
  Controller,
  Delete,
  Param,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { CreateReviewDto, JwtGuard } from '@/shared'
import { ReviewsService } from './reviews.service'
import { UpdateInterceptor } from './interceptors/update.interceptor'
import { DeleteInterceptor } from './interceptors/delete.interceptor'

@UseGuards(JwtGuard)
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @UseInterceptors(new UpdateInterceptor())
  @Put(':id')
  updateReview(
    @Param('id') id: string,
    @Body() updateReviewDto: CreateReviewDto,
  ) {
    return this.reviewsService.update(id, updateReviewDto)
  }

  @UseInterceptors(new DeleteInterceptor())
  @Delete(':id')
  deleteReview(@Param('id') id: string) {
    return this.reviewsService.delete(id)
  }
}
