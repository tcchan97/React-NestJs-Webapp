import { Module } from '@nestjs/common';
import { ShemddataService } from './shemddata.service';
import { ShemddataResolver } from './shemddata.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShemdData } from './shemddata.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShemdData])],
  providers: [ShemddataService, ShemddataResolver]
})
export class ShemddataModule {}
