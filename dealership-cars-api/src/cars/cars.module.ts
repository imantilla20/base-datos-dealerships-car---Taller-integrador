import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarsController } from './cars.controller.ts';
import { CarsService } from './cars.service.ts';
import { Car } from './entities/car.entity.ts';
import { Dealership } from '../teams/entities/dealership.entity.ts';

@Module({
  imports: [TypeOrmModule.forFeature([Car, Dealership])],
  controllers: [CarsController],
  providers: [CarsService],
  exports: [CarsService],
})
export class CarsModule {}