import { Entity, Column, ManyToOne } from 'typeorm';
import { Base } from '../../shared/base.entity'
import { Usuario } from '../../usuarios/entities/usuario.entity'
import { Clase } from 'src/clases/entities/clase.entity';

@Entity()
export class Bono extends Base {
  @Column()
  monto: number;

  @Column()
  calificacion:number;

  @Column()
  palabraClave:string;

  @ManyToOne(() => Usuario, (usuario) => usuario.bonos)
  usuario: Usuario;

  @ManyToOne(() => Clase, (clase) => clase.bonos)
  clase: Clase;
}
