import { OmitType } from '@nestjs/mapped-types'
import { CreateUserDto } from '../dtos/create-user.dto'
import { UserEntity } from '../entities/user.entity'

// Note: Since we will use this class to extend 'Express.User' we are naming the class 'UserInfo'
// > to avoid name conflicts
export class UserInfo extends OmitType(UserEntity, [
  'password',
  '_id',
] as const) {
  _id: string
}
