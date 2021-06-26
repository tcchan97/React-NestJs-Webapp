import { Resolver, Query, Args } from '@nestjs/graphql';
import { ShemdData } from './shemddata.entity';
import { ShemddataService } from './shemddata.service';

@Resolver(of => ShemdData)
export class ShemddataResolver {
  constructor(private shemddataService: ShemddataService) { }


  @Query(returns => [ShemdData])
  filterBother(@Args("serialNumber", { type: () => String })serialNumber: string, @Args("deviceId", { type: () => String }) deviceId:string) : Promise<ShemdData[]> {
    return this.shemddataService.filterBother(serialNumber,deviceId)
  }

  @Query(returns => [ShemdData])
  filterSerialNumber(@Args("serialNumber", { type: () => String }) serialNumber: string) : Promise<ShemdData[]> {
    return this.shemddataService.filterSerialNumber(serialNumber)
  }

  @Query(returns => [ShemdData])
  getAllSerialNumbers(): Promise<ShemdData[]> {
    const data = this.shemddata();
    const serialNumbers = [];
    console.log(data);
    return data;
  }

  @Query(returns => [ShemdData])
  filterDeviceId(@Args("deviceId", { type: () => String }) deviceId:string): Promise<ShemdData[]> {
    return this.shemddataService.filterDeviceId(deviceId)
  }


  @Query(returns => [ShemdData])
  shemddata(): Promise<ShemdData[]> {
    return this.shemddataService.findAll();
  }
}
