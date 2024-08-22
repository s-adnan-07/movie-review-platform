import { PickType } from '@nestjs/mapped-types'
import { CreateUserDto } from './create-user.dto'

export class UserInfoDto extends PickType(CreateUserDto, [
  'email',
  'name',
  'role',
] as const) {
  iat: number
  exp: number
}
