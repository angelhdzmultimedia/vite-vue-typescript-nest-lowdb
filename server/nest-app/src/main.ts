import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ShutdownService } from './shutdown/shutdown.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.get(ShutdownService).on('shutdown', () => app.close());
  await app.listen(5000);
}
bootstrap();
