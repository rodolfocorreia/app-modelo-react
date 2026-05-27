import { DataSource } from 'typeorm';

import { Token } from '../token/token.entity';
import { Usuarios } from '../usuarios/usuarios.entity';

const toNumber = (value: string | undefined, fallback: number): number => {
  const parsedValue = Number(value);

  return Number.isNaN(parsedValue) ? fallback : parsedValue;
};

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: process.env.DB_HOST ?? 'localhost',
        port: toNumber(process.env.DB_PORT, 3306),
        username: process.env.DB_USERNAME ?? 'mysql_admin',
        password: process.env.DB_PASSWORD ?? '123teste',
        database: process.env.DB_DATABASE ?? 'app_modelo_react',
        entities: [Usuarios, Token],
        synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
      });

      return dataSource.initialize();
    },
  },
];
