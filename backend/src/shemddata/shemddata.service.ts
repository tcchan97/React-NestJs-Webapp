import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShemdData } from './shemddata.entity';

@Injectable()
export class ShemddataService {
  constructor(@InjectRepository(ShemdData) private shemddataRepository: Repository<ShemdData>) { }

  // Query that gets all data
  async findAll(): Promise<ShemdData[]> {
    return this.shemddataRepository.find();
  }

  // Query that gets all Distinct Serial Numbers
  findAllSerialNumbers(): any {
    return this.shemddataRepository.createQueryBuilder("readings").select().distinctOn(["readings.serialNumber"]).getMany();
  }

  // Query that gets all Distinct Device Numbers
  findAllDeviceId(): any {
    return this.shemddataRepository.createQueryBuilder("readings").select().distinctOn(["readings.deviceId"]).getMany();
  }

  // Query that gets all results based on serial number and device ID
  async filterBoth(serialNumber: string, deviceId: string): Promise<ShemdData[]> {
    return this.shemddataRepository.find(
      {
        where:
        {
          serialNumber: serialNumber,
          deviceId: deviceId
        }
      }
    );
  }

  // Query that gets all results based on serial number 
  async filterSerialNumber(serialNumber: string): Promise<ShemdData[]> {
    return this.shemddataRepository.find(
      {
        where:
        {
          serialNumber: serialNumber,
        }
      }
    );
  }

  // Query that gets all results based on device ID
  async filterDeviceId( deviceId: string): Promise<ShemdData[]> {
    return this.shemddataRepository.find(
      {
        where:
        {
          deviceId: deviceId,
        }
      }
    );
  }
}
