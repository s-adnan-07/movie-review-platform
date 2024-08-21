import * as bcrypt from 'bcrypt'
import {
  ForbiddenException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { CreateUserDto, LoginDetailsDto } from '@/shared'
import { UsersService } from '../users/users.service'

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(createUserDto: CreateUserDto) {
    const { email, password, ...newUser } = createUserDto
    const user = await this.usersService.findUser(email)

    if (user) {
      throw new ForbiddenException(`User with email ${email} already exists`)
    }

    const hashedPassword = await this.hashPassword(password)
    const { name } = await this.usersService.createUser({
      ...newUser,
      email,
      password: hashedPassword,
    })

    return {
      statusCode: HttpStatus.CREATED,
      message: `User '${name}' created successfully`,
    }
  }

  async login({ email, password }: LoginDetailsDto) {
    const user = await this.usersService.findUser(email)
    const passwordsMatch = await this.comparePasswords(
      password,
      user?.password || '',
    )

    if (!user || !passwordsMatch) {
      throw new UnauthorizedException(`Invalid email or password`)
    }

    const { _id, password: userPassword, ...hydratedUser } = user
    return hydratedUser
  }

  hashPassword(password: string) {
    return bcrypt.hash(password, 10)
  }

  comparePasswords(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword)
  }
}
