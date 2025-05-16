import { Module } from '@nestjs/common';
import { BonosService } from './bonos.service';
import { BonosController } from './bonos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bono } from './entities/bono.entity';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { ClasesModule } from 'src/clases/clases.module';

@Module({
  controllers: [BonosController],
  providers: [BonosService],
  exports: [BonosService],
  imports: [TypeOrmModule.forFeature([Bono]), UsuariosModule, ClasesModule]
})
export class BonosModule {}
