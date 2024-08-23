import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { CreateUserDto, JwtGuard, LocalGuard } from '@/shared'
import { AuthService } from './auth.service'
import { Request } from 'express'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto)
  }

  @UseGuards(LocalGuard)
  @Post('login')
  async login(@Req() { user }: Request) {
    return this.authService.generateToken(user)
  }

  // For testing
  @UseGuards(JwtGuard)
  @Get('route')
  protectedRoute(@Req() { user }: Request) {
    return user
  }
}
