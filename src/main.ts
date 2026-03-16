import 'dotenv/config';
import { json, urlencoded } from 'express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Allow larger JSON payloads for gallery image uploads (base64 data URLs).
  app.use(json({ limit: '20mb' }));
  app.use(urlencoded({ extended: true, limit: '20mb' }));

  app.setGlobalPrefix('api');
  app.enableCors({
    origin: true,
  });

  await app.listen(process.env.PORT ?? 3001, '0.0.0.0');
}

void bootstrap();
