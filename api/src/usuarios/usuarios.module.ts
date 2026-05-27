import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UsuariosController } from './usuarios.controller';
import { usuariosProviders } from './usuarios.providers';
import { UsuariosService } from './usuarios.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UsuariosController],
  providers: [...usuariosProviders, UsuariosService],
  exports: [UsuariosService],
})
export class UsuariosModule {}
