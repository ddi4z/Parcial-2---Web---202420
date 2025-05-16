import { Entity, Column, OneToMany } from 'typeorm';
import { Base } from '../../shared/base.entity'
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Bono } from 'src/bonos/entities/bono.entity';

@Entity()
export class Clase extends Base {
  @Column()
  nombre: string;

  @Column()
  codigo: string;

  @Column()
  numeroCreditos: number;

  @OneToMany(() => Usuario, (usuario) => usuario.clases)
  usuario: Usuario;

  @OneToMany(() => Bono, (bono) => bono.clase)
  bonos: Bono[];
}
