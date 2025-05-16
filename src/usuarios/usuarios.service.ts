import { Injectable } from '@nestjs/common';
import { Usuario } from './entities/usuario.entity';
import { RolUsuario } from './entities/rol-usuario.entity';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async crearUsuario(usuario: Usuario) {
    if (usuario.rol === RolUsuario.PROFESOR) {
      if (!["TICSW", "IMAGINE", "COMIT"].includes(usuario.grupoInvestigacion)) {
        throw new BusinessLogicException(
          'Grupo de investigación no válido',
          BusinessError.PRECONDITION_FAILED,
        );
      }
    } 
    if (usuario.rol === RolUsuario.DECANA && usuario.numeroExtension.toString().length != 8) {
        throw new BusinessLogicException(
          'El número de extension debe ser de 8 digitos',
          BusinessError.PRECONDITION_FAILED,
        );
    }
    return 'This action adds a new usuario';
  }

  async findUsuarioById(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: {
        id
      }
    })
    if (!usuario) {
      throw new BusinessLogicException(
        `El usuario con id: ${id} no existe`,
        BusinessError.PRECONDITION_FAILED,
      );
    }
    return usuario;
  }

  async eliminarUsuario(id: number) {
    const usuario = await this.findUsuarioById(id);
    if (usuario.rol === RolUsuario.DECANA) {
      throw new BusinessLogicException(
        `El usuario con id: ${id} es decan@ y no puede ser eliminado`,
        BusinessError.PRECONDITION_FAILED,
      );  
    }
    if (usuario.bonos.length > 0) {
      throw new BusinessLogicException(
        `El usuario con id: ${id} tiene bonos y no puede ser eliminado`,
        BusinessError.PRECONDITION_FAILED,
      );  
    }
    return await this.usuarioRepository.remove(usuario);
  }
}
