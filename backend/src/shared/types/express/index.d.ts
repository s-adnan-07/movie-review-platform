import { UserInfo } from '@/shared/classes/user-info'

declare global {
  namespace Express {
    interface User extends UserInfo {}
  }
}
