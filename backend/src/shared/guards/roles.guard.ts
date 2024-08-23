import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { Roles } from '../decorators/roles.decorator'
import { Request } from 'express'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get(Roles, context.getHandler())
    if (!roles) return true

    const { user } = context.switchToHttp().getRequest<Request>()
    return roles.includes(user.role)
  }
}
