import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { ResponseInterceptor } from './shared'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get<ConfigService>(ConfigService)
  const ALLOWED_HOSTS =
    configService.get<string>('ALLOWED_HOSTS') || 'http://localhost:3080'

  app.setGlobalPrefix('api/v1')
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(new ResponseInterceptor())
  app.enableCors({ origin: ALLOWED_HOSTS.split(',') })

  await app.listen(3000)
}

bootstrap()
