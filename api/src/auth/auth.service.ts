import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { TokenService } from 'src/token/token.service';
import { Usuarios } from 'src/usuarios/usuarios.entity';
import { UsuariosService } from 'src/usuarios/usuarios.service';

export type UsuarioAutenticado = Omit<Usuarios, 'senha'>;

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly tokenService: TokenService,
  ) {}

  async validarUsuario(
    email: string,
    senha: string,
  ): Promise<UsuarioAutenticado | null> {
    const usuario =
      await this.usuariosService.findOneByEmailWithPassword(email);

    if (!usuario || !usuario.ativo) {
      return null;
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return null;
    }

    const { senha: _, ...result } = usuario;
    return result;
  }

  login(user: UsuarioAutenticado) {
    return this.tokenService.gerarAccessToken(user);
  }

  async carregarUsuarioAtual(userId: number): Promise<UsuarioAutenticado> {
    const usuario = await this.usuariosService.listarUsuarioById(userId);
    return usuario;
  }
}
