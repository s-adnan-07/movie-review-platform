import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common'
import { map, Observable } from 'rxjs'
import { UpdateResult } from '@/shared'

@Injectable()
export class UpdateInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<UpdateResult>,
  ): Observable<any> {
    return next.handle().pipe(
      map(data => {
        const { matchedCount } = data.raw
        if (matchedCount > 0) return
        throw new NotFoundException('Review not found')
      }),
    )
  }
}
