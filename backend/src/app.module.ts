import { Module } from '@nestjs/common'

import { UsersModule } from './apps/users/users.module'
import { AuthModule } from './apps/auth/auth.module'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MongoModule } from './shared'

@Module({
  imports: [UsersModule, AuthModule, MongoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
