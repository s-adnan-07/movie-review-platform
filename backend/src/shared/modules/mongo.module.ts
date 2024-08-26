import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from '../entities/user.entity'
import { MovieEntity } from '../entities/movie.entity'
import { ReviewEntity } from '../entities/review.entity'
import { ConfigService } from '@nestjs/config'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mongodb',
        host: configService.get<string>('MONGO_HOST') || 'localhost',
        port: configService.get<number>('MONGO_PORT') || 27017,
        database: configService.get<string>('DB') || 'movies_db',
        entities: [UserEntity, MovieEntity, ReviewEntity],
        synchronize: true,
      }),
    }),
  ],
})
export class MongoModule {}
