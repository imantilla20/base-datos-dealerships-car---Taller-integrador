import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CharactersService } from './cars.service.ts';
import { Character } from './entities/car.entity.ts';
import { CreateCharacterDto } from './dto/create_car.dto.ts';
import { UpdateCharacterStatusDto } from './dto/update_car_status.dto.ts';
import { FindCharactersDto} from './dto/find_car.dto.ts';

@ApiTags('cars')
@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  @ApiOperation({ summary: 'Lista los autos (filtros opcionales: status y teamId)' })
  @ApiResponse({ status: 200, description: 'Lista de autos', type: [Character] })
  @ApiResponse({ status: 400, description: 'Filtro inválido (status o teamId)' })
  findAll(@Query() query: FindCharactersDto) {
    return this.carsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene un auto por su id, incluyendo los datos de su equipo' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Auto encontrado', type: Character })
  @ApiResponse({ status: 404, description: 'El auto no existe' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.carsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crea un auto' })
  @ApiResponse({ status: 201, description: 'Auto creado', type: Character })
  @ApiResponse({ status: 400, description: 'Datos inválidos o el equipo está inactivo' })
  @ApiResponse({ status: 404, description: 'El concesionario (dealership_id) no existe' })
  @ApiResponse({ status: 409, description: 'Ya existe un auto con ese alias' })
  create(@Body() dto: CreateCharacterDto) {
    return this.carsService.create(dto);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Cambia únicamente el estado (status) del auto' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Estado actualizado', type: Character })
  @ApiResponse({
    status: 400,
    description: 'Estado inválido',
  })
  @ApiResponse({ status: 404, description: 'El auto no existe' })
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCharacterStatusDto,
  ) {
    return this.carsService.updateStatus(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina un auto' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Auto eliminado' })
  @ApiResponse({ status: 404, description: 'El auto no existe' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.carsService.remove(id);
  }
}