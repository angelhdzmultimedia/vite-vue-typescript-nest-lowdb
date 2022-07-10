import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.enableShutdownHooks();
  await app.listen(5000);
  console.log('NestJS Server listening in port 5000...');
  process.on('SIGTERM', async () => {
    await app.close();
    console.log('NestJS Server stopped listening in port 5000.');
  });
}
bootstrap();
console.log('Node application stopped.');
