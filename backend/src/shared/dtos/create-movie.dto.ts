import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { Genre } from '../entities/movie.entity'

export class CreateMovieDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsIn(['action', 'comedy', 'thriller', 'drama', 'horror'])
  genre: Genre

  @IsOptional()
  @IsString()
  image: string

  @IsOptional()
  @IsString()
  description: string
}
