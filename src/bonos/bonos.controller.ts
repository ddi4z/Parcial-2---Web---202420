import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors
} from '@nestjs/common';
import { BonosService } from './bonos.service';
import { CreateBonoDto } from './dto/create-bono.dto';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business.errors.interceptor';
import { plainToInstance } from 'class-transformer';
import { Bono } from './entities/bono.entity';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { ClasesService } from 'src/clases/clases.service';

@UseInterceptors(BusinessErrorsInterceptor)
@Controller('bonos')
export class BonosController {
  constructor(
    private readonly bonosService: BonosService,
    private readonly usuariosService: UsuariosService,
    private readonly clasesService: ClasesService,
  ) {}

  @Post()
  async crearBono(@Body() createBonoDto: CreateBonoDto) {
    const usuario = await this.usuariosService.findUsuarioById(createBonoDto.usuarioId);
    const clase = await this.clasesService.findClaseById(createBonoDto.claseId); 
    const bono = plainToInstance(Bono, createBonoDto)
    bono.usuario = usuario;
    bono.clase = clase;
    return this.bonosService.crearBono(bono);
  }

  @Get(':userId')
  findAllBonosByUsuario(@Param('userId') userId: string) {
    return this.bonosService.findAllBonosByUsuario(+userId);
  }

  @Get(':cod')
  findBonoByCodigo(@Param('cod') cod: string) {
    return this.bonosService.findBonoByCodigo(cod);
  }

  @Delete(':id')
  deleteBono(@Param('id') id: string) {
    return this.bonosService.deleteBono(+id);
  }
}
