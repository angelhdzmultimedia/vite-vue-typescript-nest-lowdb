import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ShutdownService } from './shutdown/shutdown.service';

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [AppService, ShutdownService],
})
export class AppModule {}
