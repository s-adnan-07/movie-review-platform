import {
  CreateMovieDto,
  CreateReviewDto,
  MovieEntity,
  UserInfo,
} from '@/shared'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ObjectId } from 'mongodb'
import { Repository } from 'typeorm'
import { ReviewsService } from '../reviews/reviews.service'
import { UsersService } from '../users/users.service'

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MovieEntity)
    private MoviesRepository: Repository<MovieEntity>,
    private readonly reviewsService: ReviewsService,
    private readonly usersService: UsersService,
  ) {}

  findAll(page = 1, take = 4) {
    return this.MoviesRepository.find({ take, skip: take * (page - 1) })
  }

  findOne(id: string) {
    return this.MoviesRepository.findOneBy({ _id: new ObjectId(id) })
  }

  createOne(createMovieDto: CreateMovieDto) {
    const movie = this.MoviesRepository.create(createMovieDto)
    return this.MoviesRepository.save(movie)
  }

  // TODO: calculate avarate rating from all reviews
  findReviews(id: string) {
    return this.reviewsService.find(id)
  }

  async createReview(
    movieId: string,
    { email }: UserInfo,
    createReviewDto: CreateReviewDto,
  ) {
    // To handle the case of user being deleted from db but still has valid jwt
    // and handle movie being deleted while user is writing review
    const [user, movie] = await Promise.all([
      this.usersService.findUser(email),
      this.findOne(movieId),
    ])

    if (!user) {
      throw new NotFoundException(`User not found`)
    }

    if (!movie) {
      throw new NotFoundException(`Movie not found`)
    }

    return this.reviewsService.createOne(movie, user, createReviewDto)
  }
}
