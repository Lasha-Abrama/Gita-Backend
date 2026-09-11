import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useStaticAssets(join(__dirname, 'swagger'), { prefix: '/swagger/' });
  SwaggerModule.setup(
    'api',
    app,
    {
      openapi: '3.0.3',
      info: { title: 'Movies and Directors API', version: '1.0.0' },
      paths: {},
    },
    {
      raw: false,
      customSiteTitle: 'Movies and Directors API',
      swaggerOptions: { url: '/swagger/swagger.yaml' },
    },
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
