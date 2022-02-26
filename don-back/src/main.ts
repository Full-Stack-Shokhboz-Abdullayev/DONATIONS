import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerConfig } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors();

  app.setGlobalPrefix('api/v1');
  swaggerConfig(app);

  await app.listen(configService.get('PORT') || 3000);
}
bootstrap();
