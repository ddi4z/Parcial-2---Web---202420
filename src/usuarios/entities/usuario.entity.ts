import { Entity, Column, OneToOne, OneToMany } from 'typeorm';
import { Base } from '../../shared/base.entity'
import { Bono } from '../../bonos/entities/bono.entity';
import { Clase } from 'src/clases/entities/clase.entity';

@Entity()
export class Usuario extends Base {
  @Column()
  cedula: number;

  @Column()
  nombre: string;

  @Column()
  grupoInvestigacion: string;

  @Column()
  numeroExtension: number

/*   @Column({
    type: "enum",
    enum: RolUsuario,
    default: RolUsuario.PROFESOR
  }) */
  @Column()
  rol: string;

  @OneToOne(() => Usuario, (usuario) => usuario.supervisado)
  jefe: Usuario;

  @OneToOne(() => Usuario, (usuario) => usuario.jefe)
  supervisado: Usuario;

  @OneToMany(() => Bono, (bono) => bono.usuario, { nullable: true })
  bonos: Bono[];

  @OneToMany(() => Clase, (clase) => clase.usuario)
  clases: Clase[];
}
