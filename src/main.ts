import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './shared';
import { ErrorFilter } from './shared';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ErrorFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.setGlobalPrefix('/v1/api');
  await app.listen(3000);
}
bootstrap();
