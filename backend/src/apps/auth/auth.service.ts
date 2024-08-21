import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateUserDto } from '@/shared'
import { UsersService } from '../users/users.service'

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(createUserDto: CreateUserDto) {
    const user = await this.usersService.findUser(createUserDto.email)

    if (user) {
      throw new ForbiddenException(
        `User with email ${createUserDto.email} already exists`,
      )
    }

    await this.usersService.createUser(createUserDto)

    return {
      statusCode: HttpStatus.CREATED,
      message: `User '${createUserDto.name}' created successfully`,
    }
  }
}
