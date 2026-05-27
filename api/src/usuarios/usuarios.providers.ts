import { DataSource } from 'typeorm';
import { Usuarios } from './usuarios.entity';

export const usuariosProviders = [
  {
    provide: 'USUARIOS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Usuarios),
    inject: ['DATABASE_CONNECTION'],
  },
];
