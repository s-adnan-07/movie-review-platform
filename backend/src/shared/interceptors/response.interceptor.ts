import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { Response } from 'express'
import { map, Observable } from 'rxjs'

export interface ResponseObject<T> {
  statusCode: number
  message: string
  data: T
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ResponseObject<T>>
{
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { statusCode, statusMessage } = context
      .switchToHttp()
      .getResponse<Response>()

    const message = statusMessage ?? 'Success'

    return next.handle().pipe(map(data => ({ statusCode, message, data })))
  }
}
