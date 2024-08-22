import { Controller, Get, Param, Query } from '@nestjs/common'
import { MoviesService } from './movies.service'

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
}
