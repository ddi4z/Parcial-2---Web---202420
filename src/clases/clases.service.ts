import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clase } from './entities/clase.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';

@Injectable()
export class ClasesService {
  constructor(
    @InjectRepository(Clase)
    private readonly claseRepository: Repository<Clase>,
  ) {}

  async crearClase(clase: Clase) {
    if (!clase.codigo || clase.codigo.length !== 10) {
        throw new BusinessLogicException(
        `El codigo debe tener al menos 10 caracteres`,
        BusinessError.PRECONDITION_FAILED,
      );
    }
    return await this.claseRepository.save(clase);
  }

  async findClaseByCodigo(cod: string) {
    const clase = await this.claseRepository.findOne({
      where: {codigo: cod}
    }) 
    if (!clase) {
      throw new BusinessLogicException(
        `No se encontró clase con el codigo ${cod}`,
        BusinessError.NOT_FOUND,
      );
    }
    return clase;
  }

  async findClaseById(id: number) {
    const clase = await this.claseRepository.findOne({
      where: {id}
    }) 
    if (!clase) {
      throw new BusinessLogicException(
        `No se encontró clase con el id ${id}`,
        BusinessError.NOT_FOUND,
      );
    }
    return clase;
  }
}
