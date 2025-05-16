import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { BonosModule } from './bonos/bonos.module';
import { ClasesModule } from './clases/clases.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuarios/entities/usuario.entity';
import { Clase } from './clases/entities/clase.entity';
import { Bono } from './bonos/entities/bono.entity';

@Module({
  imports: [UsuariosModule, BonosModule, ClasesModule, 
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite3',
      entities: [Usuario, Clase, Bono],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
