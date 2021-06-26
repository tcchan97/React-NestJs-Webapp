import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShemdData } from './shemddata.entity';

@Injectable()
export class ShemddataService {
  constructor(@InjectRepository(ShemdData) private shemddataRepository: Repository<ShemdData>) { }


  async findAll(): Promise<ShemdData[]> {
    return this.shemddataRepository.find();
  }

  // async findAllofOne(serialNumber: string): Promise<ShemdData[]> {
  //   return this.shemddataRepository.find({ serialNumber: serialNumber });
  // }
  //distinctOn(["readings.serialNumber"]);

  findAllSerialNumbers(): any {
    return this.shemddataRepository.createQueryBuilder("readings").select().distinctOn(["readings.serialNumber"]).getMany();
  }

  findAllDeviceId(): any {
    return this.shemddataRepository.createQueryBuilder("readings").select().distinctOn(["readings.deviceId"]).getMany();
  }

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


  // async getAllbySerialNumberAndDeviceId(serialNumber: string, deviceId: string): Promise<ShemdData[]> {
  //   return this.shemddataRepository.find({ serialNumber: serialNumber, deviceId: deviceId });
  // }

  // findOne(serialNumber: string): Promise<ShemdData> {
  //   return this.shemddataRepository.findOne(serialNumber);
  // }
}
