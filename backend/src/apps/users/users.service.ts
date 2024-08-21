import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto, UserEntity } from '@/shared'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private UsersRepository: Repository<UserEntity>,
  ) {}

  findUser = (email: string) => this.UsersRepository.findOneBy({ email })

  createUser = (createUserDto: CreateUserDto) => {
    const user = this.UsersRepository.create(createUserDto)
    return this.UsersRepository.insert(user)
  }
}
