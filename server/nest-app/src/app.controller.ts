import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getIndex(): string {
    return this.appService.getIndex();
  }

  @Get('shutdown')
  getShutdown() {
    process.emit('disconnect');
    return 'Shutting down...';
  }
}
