import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("readings", { schema: "public" })
@ObjectType()
export class ShemdData {
  // @PrimaryColumn("text", { name: "Serial_Number"})

  //  @PrimaryColumn("number", { name: ""})
  //  @Field(type => Int)
  //   id: number;

  @Column("text", { name: "Serial_Number" })
  @Field()
  serialNumber: string | null;


  @PrimaryColumn("timestamp without time zone", { name: "DateTime" })
  //@Column("timestamp without time zone", { name: "DateTime", nullable: true })
  @Field()
  dateTime: Date | null;

  @Column("text", { name: "Device_ID"})
  @Field({ nullable: true })
  deviceId: string | null;

  @Column("text", { name: "Device_Name", nullable: true })
  @Field({ nullable: true })
  deviceName: string | null;

  @Column("text", { name: "User_Device_Name", nullable: true })
  @Field({ nullable: true })
  userDeviceName: string | null;

  @Column("text", { name: "Device_Type", nullable: true })
  @Field({ nullable: true })
  deviceType: string | null;

  @Column("text", { name: "Device_Make", nullable: true })
  @Field({ nullable: true })
  deviceMake: string | null;

  @Column("text", { name: "Device_Model", nullable: true })
  @Field({ nullable: true })
  deviceModel: string | null;

  @Column("text", { name: "Device_Location", nullable: true })
  @Field({ nullable: true })
  deviceLocation: string | null;

  @Column("numeric", { name: "Wattage", nullable: true })
  @Field(type => String, { nullable: true })
  wattage: string | null;
}