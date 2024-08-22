import { IsInt, IsNotEmpty, IsString } from 'class-validator'

export class CreateReviewDto {
  @IsNotEmpty()
  @IsInt()
  rating: number

  @IsNotEmpty()
  @IsString()
  feedback: string
}
