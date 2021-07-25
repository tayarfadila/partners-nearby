import { Controller, Get } from '@nestjs/common';

@Controller('greet')
export class GreetingsController {
  @Get()
  greet() {
    return { greeting: 'Hello World' };
  }
}