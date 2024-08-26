import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { CreateReviewDto, JwtGuard } from '@/shared'
import { ReviewsService } from './reviews.service'
import { UpdateInterceptor } from './interceptors/update.interceptor'
import { DeleteInterceptor } from './interceptors/delete.interceptor'
import { Request } from 'express'

@UseGuards(JwtGuard)
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  findByUser(@Req() { user }: Request) {
    return this.reviewsService.findByUser(user._id)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(id)
  }

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
