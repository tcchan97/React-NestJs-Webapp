import { Test, TestingModule } from '@nestjs/testing';
import { ShemddataService } from './shemddata.service';

describe('ShemddataService', () => {
  let service: ShemddataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShemddataService],
    }).compile();

    service = module.get<ShemddataService>(ShemddataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
