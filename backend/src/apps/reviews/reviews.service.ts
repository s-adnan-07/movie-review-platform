import { CreateReviewDto, ReviewEntity, UserInfo } from '@/shared'
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

  // TODO: Ensure a user can post only 1 review per movie
  // Create a combo field "username + moviename"
  // If it exists, throw error
  // Use insert instead of save to catch duplicate key errors
  // TODO: check if movie exists before posting review
  // To solve this instead of injecting review service in movie controller, inject it in movies service
  create(
    movieId: string,
    { _id, name }: UserInfo,
    createReviewDto: CreateReviewDto,
  ) {
    const review = this.ReviewsRepository.create({
      movie: new ObjectId(movieId),
      user: new ObjectId(_id),
      userName: name,
      ...createReviewDto,
    })

    return this.ReviewsRepository.save(review)
  }
}
