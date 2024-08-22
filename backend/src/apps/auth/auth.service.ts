import * as bcrypt from 'bcrypt'
import {
  ForbiddenException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { CreateUserDto, LoginDetailsDto } from '@/shared'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

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
    const userExists = await this.usersService.findUser(email)
    const passwordsMatch = await this.comparePasswords(
      password,
      userExists?.password || '',
    )

    if (!userExists || !passwordsMatch) {
      throw new UnauthorizedException(`Invalid email or password`)
    }

    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    const { password: userPassword, ...user } = userExists
    const token = await this.jwtService.signAsync(user)

    return { token, user }
  }

  hashPassword(password: string) {
    return bcrypt.hash(password, 10)
  }

  comparePasswords(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword)
  }
}
