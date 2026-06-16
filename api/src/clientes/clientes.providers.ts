import { DataSource } from 'typeorm';
import { Clientes } from './clientes.entity';

export const clientesProviders = [
  {
    provide: 'CLIENTES_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Clientes),
    inject: ['DATABASE_CONNECTION'],
  },
];
