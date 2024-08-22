import { UserInfo } from './user-info'

export class UserJwt extends UserInfo {
  iat: number
  exp: number
}
