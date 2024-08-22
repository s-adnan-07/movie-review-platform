import { IsNotEmpty, IsString } from 'class-validator'

export class LoginDetailsDto {
  @IsNotEmpty()
  @IsString()
  email: string

  @IsNotEmpty()
  @IsString()
  password: string
}
