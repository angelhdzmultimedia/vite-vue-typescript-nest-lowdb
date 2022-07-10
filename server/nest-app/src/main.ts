import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import kill from 'kill-port';
async function bootstrap() {
  await kill(5000, 'tcp');
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(5000);
}
bootstrap();
