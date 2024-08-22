import { UserInfo, UserJwt } from '@/shared'
import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'supersecret',
      ignoreExpiration: false,
      usernameField: 'email',
    })
  }

  validate = ({ iat, exp, ...user }: UserJwt): UserInfo => user
}

