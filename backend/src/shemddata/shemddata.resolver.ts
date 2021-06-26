import { Resolver, Query, Args } from '@nestjs/graphql';
import { ShemdData } from './shemddata.entity';
import { ShemddataService } from './shemddata.service';

@Resolver(of => ShemdData)
export class ShemddataResolver {
  constructor(private shemddataService: ShemddataService) { }

  // Query that gets all results based on serial number and device ID
  @Query(returns => [ShemdData])
  filterBoth(@Args("serialNumber", { type: () => String }) serialNumber: string, @Args("deviceId", { type: () => String }) deviceId: string): Promise<ShemdData[]> {
    return this.shemddataService.filterBoth(serialNumber, deviceId)
  }

  // Query that gets all results based on serial number 
  @Query(returns => [ShemdData])
  filterSerialNumber(@Args("serialNumber", { type: () => String }) serialNumber: string): Promise<ShemdData[]> {
    return this.shemddataService.filterSerialNumber(serialNumber)
  }

  // Query that gets all results based on device ID
  @Query(returns => [ShemdData])
  filterDeviceId(@Args("deviceId", { type: () => String }) deviceId: string): Promise<ShemdData[]> {
    return this.shemddataService.filterDeviceId(deviceId)
  }

  // Query that gets all Distinct Serial Numbers
  @Query(returns => [ShemdData])
  getAllSerialNumbers(): Promise<ShemdData[]> {
    return this.shemddataService.findAllSerialNumbers();
  }

  // Query that gets all Distinct Device Numbers
  @Query(returns => [ShemdData])
  getAllDeviceId(): Promise<ShemdData[]> {
    return this.shemddataService.findAllDeviceId();
  }

// Query that gets all data
  @Query(returns => [ShemdData])
  shemddata(): Promise<ShemdData[]> {
    return this.shemddataService.findAll();
  }
}
