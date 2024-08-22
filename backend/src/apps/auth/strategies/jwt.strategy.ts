import { UserInfoDto } from '@/shared'
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

  validate = ({ iat, exp, ...user }: UserInfoDto) => user
}

