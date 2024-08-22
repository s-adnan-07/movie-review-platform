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
import { Request } from 'express'

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

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
    return this.moviesService.findReviews(id)
  }

  @UseGuards(JwtGuard)
  @Post(':movieId/reviews')
  createReview(
    @Param('movieId') movieId: string,
    @Body() createReviewDto: CreateReviewDto,
    @Req() { user }: Request,
  ) {
    return this.moviesService.createReview(movieId, user, createReviewDto)
  }
}
