import { CreateReviewDto, ReviewEntity } from '@/shared'
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

  // Ensure a user can post only 1 review per movie
  create(id: string, createReviewDto: CreateReviewDto) {
    const review = this.ReviewsRepository.create({
      movie: new ObjectId(id),
      ...createReviewDto,
    })

    return this.ReviewsRepository.save(review)
  }
}
