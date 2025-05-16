import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors} from '@nestjs/common';
import { ClasesService } from './clases.service';
import { CreateClaseDto } from './dto/create-clase.dto';
import { UpdateClaseDto } from './dto/update-clase.dto';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business.errors.interceptor';
import { plainToInstance } from 'class-transformer';
import { Clase } from './entities/clase.entity';

@UseInterceptors(BusinessErrorsInterceptor)
@Controller('clases')
export class ClasesController {
  constructor(private readonly clasesService: ClasesService) {}

  @Post()
  crearClase(@Body() createClaseDto: CreateClaseDto) {
    const clase = plainToInstance(Clase, createClaseDto);
    return this.clasesService.crearClase(clase);
  }

  @Get(':id')
  findClaseById(@Param('id') id: string) {
    return this.clasesService.findClaseById(+id);
  }
}
