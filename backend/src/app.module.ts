import { Module } from '@nestjs/common'

import { AuthModule } from './apps/auth/auth.module'
import { UsersModule } from './apps/users/users.module'
import { MoviesModule } from './apps/movies/movies.module'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MongoModule } from './shared'

@Module({
  imports: [UsersModule, AuthModule, MongoModule, MoviesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
