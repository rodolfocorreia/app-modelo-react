import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';

import { Usuarios } from 'src/usuarios/usuarios.entity';
import { UsuariosService } from 'src/usuarios/usuarios.service';

import { Token } from './token.entity';

type UsuarioSemSenha = Omit<Usuarios, 'senha'>;

@Injectable()
export class TokenService {
  constructor(
    @Inject('TOKEN_REPOSITORY')
    private readonly tokenRepository: Repository<Token>,
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  async gerarAccessToken(user: UsuarioSemSenha) {
    const payload = { username: user.email, sub: user.codigo };
    const token = await this.jwtService.signAsync(payload);

    await this.tokenRepository.upsert(
      { hash: token, email: user.email },
      ['email'],
    );

    return {
      token,
      user: {
        codigo: user.codigo,
        nome: user.nome,
        usuario: user.usuario,
        email: user.email,
        ativo: user.ativo,
      },
    };
  }

  async refreshToken(oldToken: string) {
    const token = await this.tokenRepository.findOne({
      where: { hash: oldToken },
    });

    if (!token) {
      throw new UnauthorizedException('Token invalido');
    }

    const usuario = await this.usuariosService.findOneByEmail(token.email);

    if (!usuario) {
      throw new UnauthorizedException('Usuario do token nao encontrado');
    }

    const { senha: _, ...usuarioSemSenha } = usuario;
    return this.gerarAccessToken(usuarioSemSenha);
  }
}
