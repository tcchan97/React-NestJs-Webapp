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
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('HOST'),
        port: +configService.get<number>('PORT'),
        username: configService.get('USER'),
        password: configService.get('PASSWORD'),
        database: configService.get('DATABASE'),
        ssl: true,
        //entities: ['dist/**/*.entity{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: true,
        //Use this when setting up for production - Its only set for development mode currently
        // synchronize: false,
        // migrations: ["dist/migrations/*{.ts,.js}"],
        // migrationsTableName: "migrations_typeorm",
        // migrationsRun: true
      }),
      inject: [ConfigService],
    }),
    ShemddataModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
