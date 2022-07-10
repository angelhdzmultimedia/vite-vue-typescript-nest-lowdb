import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.enableShutdownHooks()
  await app.listen(5000);
  console.log('Server listening in port 5000...')
  process.on('shutdown', async () => {
    await app.close()
    console.log('Server stopped listening in port 5000.')
  })
}
bootstrap();
