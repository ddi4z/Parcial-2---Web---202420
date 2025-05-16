import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ClasesService } from './clases.service';
import { ClasesController } from './clases.controller';
import { Clase } from './entities/clase.entity';

@Module({
  controllers: [ClasesController],
  exports: [ClasesService],
  imports: [TypeOrmModule.forFeature([Clase])],
  providers: [ClasesService],
})
export class ClasesModule {}
