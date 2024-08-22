import {
  CreateReviewDto,
  MovieEntity,
  ReviewEntity,
  UserEntity,
} from '@/shared'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ObjectId } from 'mongodb'
import { Repository } from 'typeorm'

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewEntity)
    private ReviewsRepository: Repository<ReviewEntity>,
  ) {}

  find(id: string) {
    return this.ReviewsRepository.find({ where: { movie: new ObjectId(id) } })
  }

  // TODO: convert positional arguments to object
  // TODO: Ensure a user can post only 1 review per movie
  // Create a combo field "username + moviename"
  // If it exists, throw error
  // Use insert instead of save to catch duplicate key errors
  createOne(
    { _id: movie, name: movieName }: MovieEntity,
    { _id: user, name: userName }: UserEntity,
    createReviewDto: CreateReviewDto,
  ) {
    const review = this.ReviewsRepository.create({
      movie,
      movieName,
      user,
      userName,
      ...createReviewDto,
    })

    return this.ReviewsRepository.save(review)
  }
}
