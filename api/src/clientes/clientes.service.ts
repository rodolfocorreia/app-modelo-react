import {
  ConflictException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { QueryFailedError, Repository } from 'typeorm';

import {
  ClientesAlterarAtivoDto,
  ClientesCadastrarDto,
} from './dto/clientes.cadastrar.dto';
import { Clientes } from './clientes.entity';

@Injectable()
export class ClientesService {
  private readonly logger = new Logger(ClientesService.name);

  constructor(
    @Inject('CLIENTES_REPOSITORY')
    private readonly clienteRepository: Repository<Clientes>,
  ) {}

  async cadastrarCliente(data: ClientesCadastrarDto): Promise<Clientes> {
    try {
      const cliente = this.clienteRepository.create({
        ...data,
        ativo: true,
      });

      return await this.clienteRepository.save(cliente);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new ConflictException('Email ou CPF/CNPJ ja cadastrado');
      }
      this.logger.error('Erro ao cadastrar cliente', error as Error);
      throw error;
    }
  }

  listarClientes(): Promise<Clientes[]> {
    return this.clienteRepository.find({ order: { codigo: 'ASC' } });
  }

  async listarClienteById(codigo: number): Promise<Clientes> {
    const cliente = await this.clienteRepository.findOne({
      where: { codigo },
      select: {
        codigo: true,
        nome: true,
        email: true,
        telefone: true,
        endereco: true,
        ativo: true,
      },
    });

    if (!cliente) {
      throw new NotFoundException(`Cliente ${codigo} nao encontrado`);
    }

    return cliente;
  }

  async deletarCliente(codigo: number): Promise<void> {
    const resultado = await this.clienteRepository.delete(codigo);

    if (resultado.affected !== 1) {
      throw new NotFoundException(`Cliente ${codigo} nao encontrado`);
    }
  }

  async atualizarCliente(
    codigo: number,
    data: ClientesCadastrarDto,
  ): Promise<Clientes> {
    const cliente = await this.clienteRepository.findOne({ where: { codigo } });

    if (!cliente) {
      throw new NotFoundException(`Cliente ${codigo} nao encontrado`);
    }

    Object.assign(cliente, data);

    try {
      return await this.clienteRepository.save(cliente);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new ConflictException('Email ou CPF/CNPJ ja cadastrado');
      }
      this.logger.error('Erro ao atualizar cliente', error as Error);
      throw error;
    }
  }

  async updateAtivoCliente(
    codigo: number,
    data: ClientesAlterarAtivoDto,
  ): Promise<Clientes> {
    const cliente = await this.clienteRepository.findOne({ where: { codigo } });

    if (!cliente) {
      throw new NotFoundException(`Cliente ${codigo} nao encontrado`);
    }

    cliente.ativo = data.ativo;

    return this.clienteRepository.save(cliente);
  }

}
