import {
  ConflictException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { QueryFailedError, Repository } from 'typeorm';

import {
  UsuarioAlterarAtivoDto,
  UsuarioCadastrarDto,
} from './dto/usuario.cadastrar.dto';
import { Usuarios } from './usuarios.entity';

const SALT_ROUNDS = 10;

@Injectable()
export class UsuariosService {
  private readonly logger = new Logger(UsuariosService.name);

  constructor(
    @Inject('USUARIOS_REPOSITORY')
    private readonly usuarioRepository: Repository<Usuarios>,
  ) {}

  async cadastrarUsuario(data: UsuarioCadastrarDto): Promise<Usuarios> {
    try {
      const usuario = this.usuarioRepository.create({
        ...data,
        ativo: true,
        senha: await bcrypt.hash(data.senha, SALT_ROUNDS),
      });

      return await this.usuarioRepository.save(usuario);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new ConflictException('Email ou usuario ja cadastrado');
      }
      this.logger.error('Erro ao cadastrar usuario', error as Error);
      throw error;
    }
  }

  listarUsuarios(): Promise<Usuarios[]> {
    return this.usuarioRepository.find({ order: { codigo: 'ASC' } });
  }

  async listarUsuarioById(codigo: number): Promise<Usuarios> {
    const usuario = await this.usuarioRepository.findOne({
      where: { codigo },
      select: {
        codigo: true,
        nome: true,
        usuario: true,
        email: true,
        telefone: true,
        endereco: true,
        ativo: true,
      },
    });

    if (!usuario) {
      throw new NotFoundException(`Usuario ${codigo} nao encontrado`);
    }

    return usuario;
  }

  async deletarUsuario(codigo: number): Promise<void> {
    const resultado = await this.usuarioRepository.delete(codigo);

    if (resultado.affected !== 1) {
      throw new NotFoundException(`Usuario ${codigo} nao encontrado`);
    }
  }

  async updateAtivoUsuario(
    codigo: number,
    data: UsuarioAlterarAtivoDto,
  ): Promise<Usuarios> {
    const usuario = await this.usuarioRepository.findOne({ where: { codigo } });

    if (!usuario) {
      throw new NotFoundException(`Usuario ${codigo} nao encontrado`);
    }

    usuario.ativo = data.ativo;
    return this.usuarioRepository.save(usuario);
  }

  findOneByEmail(email: string): Promise<Usuarios | null> {
    return this.usuarioRepository.findOne({ where: { email } });
  }

  findOneByEmailWithPassword(email: string): Promise<Usuarios | null> {
    return this.usuarioRepository
      .createQueryBuilder('usuario')
      .addSelect('usuario.senha')
      .where('usuario.email = :email', { email })
      .getOne();
  }
}
