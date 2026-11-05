import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { CarsModule } from './cars/cars.module.ts';
import { DealershipsModule } from './dealership/dealerships.module.ts';
import { Character } from './characters/entities/character.entity.ts';
import { Team } from './teams/entities/team.entity.ts';

const env = (globalThis as typeof globalThis & {
  process?: { env?: Record<string, string | undefined> };
}).process?.env ?? {};

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: env.DB_HOST ?? 'DB_HOST',
      port: Number(env.DB_PORT ?? 'DB_PORT'),
      username: env.DB_USER ?? 'DB_USER',
      password: env.DB_PASSWORD ?? 'DB_PASSWORD',
      database: env.DB_NAME ?? 'DB_NAME',
      entities: [Team, Character],
      synchronize: false,
    }),
    CarsModule,
    DealershipsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}