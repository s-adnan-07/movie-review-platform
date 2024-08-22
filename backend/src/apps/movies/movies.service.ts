import { MovieEntity } from '@/shared'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ObjectId } from 'mongodb'
import { Repository } from 'typeorm'

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MovieEntity)
    private MoviesRepository: Repository<MovieEntity>,
  ) {}

  findAll(page = 1, take = 4) {
    return this.MoviesRepository.find({ take, skip: take * (page - 1) })
  }

  findOne(id: string) {
    return this.MoviesRepository.findOneBy({ _id: new ObjectId(id) })
  }
}
