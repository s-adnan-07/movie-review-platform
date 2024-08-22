import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { CreateReviewDto } from '@/shared'
import { MoviesService } from './movies.service'
import { ReviewsService } from '../reviews/reviews.service'

@Controller('movies')
export class MoviesController {
  constructor(
    private readonly moviesService: MoviesService,
    private readonly reviewsService: ReviewsService,
  ) {}

  @Get()
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.moviesService.findAll(+page, +limit)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(id)
  }

  @Get(':id/reviews')
  findReviews(@Param('id') id: string) {
    return this.reviewsService.find(id)
  }

  @Post(':id/reviews')
  createReview(
    @Param('id') id: string,
    @Body() createReviewDto: CreateReviewDto,
  ) {
    return this.reviewsService.create(id, createReviewDto)
  }
}
