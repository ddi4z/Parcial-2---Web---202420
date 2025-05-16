import { Injectable } from '@nestjs/common';
import { Bono } from './entities/bono.entity';
import { RolUsuario } from 'src/usuarios/entities/rol-usuario.entity';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClasesService } from '../clases/clases.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class BonosService {
  constructor(
    @InjectRepository(Bono)
    private readonly bonoRepository: Repository<Bono>,
    private readonly clasesService: ClasesService,
    private readonly usuariosService: UsuariosService,
  ) {}

  async crearBono(bono: Bono) {
    if (bono.usuario.rol !== RolUsuario.PROFESOR) {
      throw new BusinessLogicException(
        'El rol del usuario debe ser profesor',
        BusinessError.PRECONDITION_FAILED,
      );
    }
   if (!bono.monto) {
      throw new BusinessLogicException(
        'El bono debe tener un monto',
        BusinessError.PRECONDITION_FAILED,
      );
    }
    if (bono.monto <= 0) {
      throw new BusinessLogicException(
        'El monto del bono debe ser positivo',
        BusinessError.PRECONDITION_FAILED,
      );
    }
    return await this.bonoRepository.save(bono);
  }

  async findAllBonosByUsuario(userId: number) {
    const usuario = await this.usuariosService.findUsuarioById(userId);
    return this.bonoRepository.find({
      where: { usuario }
    })
  }

  async findBonoByCodigo(cod: string) {
    const clase = await this.clasesService.findClaseByCodigo(cod);
    const bono = await this.bonoRepository.findOne({
      where: {
        clase
      }
    })
    if (!bono) {
      throw new BusinessLogicException(
        `No se encontró un bono con codigo de clase ${cod}`,
        BusinessError.NOT_FOUND,
      );
    }
    return clase;
  }

  async deleteBono(id: number) {
    const bono = await this.bonoRepository.findOne({where: {id}});
    if (!bono) {
      throw new BusinessLogicException(
        `No se encontró un bono con el id ${id}`,
        BusinessError.NOT_FOUND,
      );
    }
    return await this.bonoRepository.remove(bono);
  }
}
