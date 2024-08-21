import { Body, Controller, Post } from '@nestjs/common'
import { CreateUserDto, LoginDetailsDto } from '@/shared'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto)
  }

  @Post('login')
  login(@Body() loginDetailsDto: LoginDetailsDto) {
    return this.authService.login(loginDetailsDto)
  }
}
