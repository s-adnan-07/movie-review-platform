import { IsNotEmpty } from 'class-validator'

// We remove all validations as user login will fail since details dont match in db
export class LoginDetailsDto {
  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  password: string
}
