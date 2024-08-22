import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from '../entities/user.entity'
import { MovieEntity } from '../entities/movie.entity'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      database: 'movies_db',
      entities: [UserEntity, MovieEntity],
      synchronize: true,
    }),
  ],
})
export class MongoModule {}
