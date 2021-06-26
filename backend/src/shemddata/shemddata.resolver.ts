import { Resolver, Query, Args } from '@nestjs/graphql';
import { ShemdData } from './shemddata.entity';
import { ShemddataService } from './shemddata.service';

@Resolver(of => ShemdData)
export class ShemddataResolver {
  constructor(private shemddataService: ShemddataService) { }


  @Query(returns => [ShemdData])
  filterBoth(@Args("serialNumber", { type: () => String })serialNumber: string, @Args("deviceId", { type: () => String }) deviceId:string) : Promise<ShemdData[]> {
    return this.shemddataService.filterBoth(serialNumber,deviceId)
  }

  @Query(returns => [ShemdData])
  filterSerialNumber(@Args("serialNumber", { type: () => String }) serialNumber: string) : Promise<ShemdData[]> {
    return this.shemddataService.filterSerialNumber(serialNumber)
  }

  @Query(returns => [ShemdData])
  getAllSerialNumbers(): Promise<ShemdData[]> {
    return this.shemddataService.findAllSerialNumbers();
  }

  @Query(returns => [ShemdData])
  getAllDeviceId(): Promise<ShemdData[]> {
    return this.shemddataService.findAllDeviceId();
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
