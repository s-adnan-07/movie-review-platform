import { Body, Controller, Post, Res } from '@nestjs/common'
import { CreateUserDto, LoginDetailsDto } from '@/shared'
import { AuthService } from './auth.service'
import { Response } from 'express'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto)
  }

  @Post('login')
  async login(
    @Body() loginDetailsDto: LoginDetailsDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { token, user } = await this.authService.login(loginDetailsDto)
    response.header('jwt', token)
    return user
  }
}
