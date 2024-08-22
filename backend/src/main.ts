import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { ResponseInterceptor } from './shared'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(new ResponseInterceptor())

  await app.listen(3000)
}

bootstrap()
