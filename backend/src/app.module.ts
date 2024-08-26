import { Module } from '@nestjs/common'

import { AuthModule } from './apps/auth/auth.module'
import { UsersModule } from './apps/users/users.module'
import { MoviesModule } from './apps/movies/movies.module'
import { ReviewsModule } from './apps/reviews/reviews.module'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MongoModule } from './shared'
import { ConfigModule } from '@nestjs/config'

// TODO: Add env file and config service
@Module({
  imports: [
    MongoModule,
    UsersModule,
    AuthModule,
    MoviesModule,
    ReviewsModule,
    ConfigModule.forRoot({ isGlobal: true, ignoreEnvFile: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
