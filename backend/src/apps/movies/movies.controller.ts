import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common'
import { CreateReviewDto, JwtGuard } from '@/shared'
import { MoviesService } from './movies.service'
import { ReviewsService } from '../reviews/reviews.service'
import { Request } from 'express'

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

  @Get(':movieId/reviews')
  findReviews(@Param('id') id: string) {
    return this.reviewsService.find(id)
  }

  @UseGuards(JwtGuard)
  @Post(':movieId/reviews')
  createReview(
    @Param('movieId') movieId: string,
    @Body() createReviewDto: CreateReviewDto,
    @Req() { user }: Request,
  ) {
    return this.reviewsService.create(movieId, user, createReviewDto)
  }
}
