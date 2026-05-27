import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UsuariosModule } from 'src/usuarios/usuarios.module';

import { DatabaseModule } from '../database/database.module';
import { jwtConstants } from '../auth/constants';
import { TokenController } from './token.controller';
import { tokenProviders } from './token.providers';
import { TokenService } from './token.service';

@Module({
  imports: [
    DatabaseModule,
    UsuariosModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
  controllers: [TokenController],
  providers: [...tokenProviders, TokenService],
  exports: [TokenService],
})
export class TokenModule {}
