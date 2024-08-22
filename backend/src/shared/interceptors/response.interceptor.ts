import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { map, Observable } from 'rxjs'

export interface Response<T> {
  status: number
  message: string
  data: T
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(map(data => ({ status: HttpStatus.OK, message: 'Success', data })))
  }
}
