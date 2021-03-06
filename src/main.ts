import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { TransformInterceptor } from './shared';
import { ErrorFilter } from './shared';
import { ValidationPipe } from '@nestjs/common';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    forbidUnknownValues: true,
    transform: true,
  }));
  const options = new DocumentBuilder()
  .setTitle('AYS SERVER')
  .setDescription('The AYS server API description')
  .setVersion('1.0')
  .addServer('/v1/api')
  .addTag('app')
  .build();
  const document = SwaggerModule.createDocument(app, options, {
    ignoreGlobalPrefix: true,
  });
  SwaggerModule.setup('docs', app, document);

  app.enableCors();
  app.useGlobalFilters(new ErrorFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.setGlobalPrefix('/v1/api');

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
