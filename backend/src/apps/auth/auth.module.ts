import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UsersModule } from '../users/users.module'
import { UsersService } from '../users/users.service'

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: 'supersecret',
      signOptions: { expiresIn: '1 day' },
    }),
  ],
  providers: [AuthService, UsersService],
  controllers: [AuthController],
})
export class AuthModule {}
