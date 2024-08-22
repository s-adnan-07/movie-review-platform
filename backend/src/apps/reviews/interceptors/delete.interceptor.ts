import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common'
import { map, Observable } from 'rxjs'
import { DeleteResult } from '@/shared'

@Injectable()
export class DeleteInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<DeleteResult>,
  ): Observable<any> {
    return next.handle().pipe(
      map(data => {
        const { deletedCount } = data.raw
        if (deletedCount > 0) return
        throw new NotFoundException('Review not found')
      }),
    )
  }
}
