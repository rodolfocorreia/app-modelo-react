import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ClientesController } from './clientes.controller';
import { clientesProviders } from './clientes.providers';
import { ClientesService } from './clientes.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ClientesController],
  providers: [...clientesProviders, ClientesService],
  exports: [ClientesService],
})
export class ClientesModule {}
