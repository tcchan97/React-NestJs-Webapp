import { Test, TestingModule } from '@nestjs/testing';
import { ShemddataResolver } from './shemddata.resolver';

describe('ShemddataResolver', () => {
  let resolver: ShemddataResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShemddataResolver],
    }).compile();

    resolver = module.get<ShemddataResolver>(ShemddataResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
