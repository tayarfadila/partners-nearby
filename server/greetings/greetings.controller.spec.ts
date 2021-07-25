import { Test, TestingModule } from '@nestjs/testing';
import { GreetingsController } from './greetings.controller';

describe('GreetingsController', () => {
  let controller: GreetingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GreetingsController],
    }).compile();

    controller = module.get<GreetingsController>(GreetingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
