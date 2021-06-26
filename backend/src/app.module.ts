import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShemddataModule } from './shemddata/shemddata.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    // TypeOrmModule.forRoot({
    //   type:'postgres',
    //   host: ConfigService.get('HOST'),
    //   port: 5432,
    //   username: 'smarthomesdashboarduser@smarthomes',
    //   password: "b5zT;q_fS{\a}AUtpD",
    //   database: 'wattage',
    //   ssl: true,
    //   entities: ['dist/**/*.entity{.ts,.js}'],
    //   synchronize:true,
    // }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('HOST'),
        port: +configService.get<number>('PORT'),
        username: "smarthomesdashboarduser@smarthomes",
        password: configService.get('PASSWORD'),
        database: configService.get('DATABASE'),
        ssl: true,
        //entities: ['dist/**/*.entity{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    ShemddataModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
