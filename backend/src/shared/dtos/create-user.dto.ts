import { IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { LoginDetailsDto } from './login-details.dto'

export class CreateUserDto extends LoginDetailsDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsOptional()
  @IsString()
  role: 'local'
}
