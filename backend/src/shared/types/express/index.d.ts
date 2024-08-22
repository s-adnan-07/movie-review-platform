import { UserInfoDto } from '@/shared/dtos/user-info.dto'

declare global {
  namespace Express {
    export interface Request {
      user?: UserInfoDto
    }
  }
}

