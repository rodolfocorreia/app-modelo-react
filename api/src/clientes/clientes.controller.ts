import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import {
  ClientesAlterarAtivoDto,
  ClientesCadastrarDto,
} from './dto/clientes.cadastrar.dto';
import { ClientesService } from './clientes.service';

@ApiTags('clientes')
@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @ApiOperation({ summary: 'Cadastra um novo cliente' })
  @Post()
  cadastrarCliente(@Body() data: ClientesCadastrarDto) {
    return this.clientesService.cadastrarCliente(data);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Lista todos os clientes' })
  @UseGuards(JwtAuthGuard)
  @Get()
  listarClientes() {
    return this.clientesService.listarClientes();
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Lista um cliente pelo codigo' })
  @UseGuards(JwtAuthGuard)
  @Get(':codigo')
  listarClienteById(@Param('codigo', ParseIntPipe) codigo: number) {
    return this.clientesService.listarClienteById(codigo);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualiza os dados do cliente' })
  @UseGuards(JwtAuthGuard)
  @Put(':codigo')
  atualizarCliente(
    @Param('codigo', ParseIntPipe) codigo: number,
    @Body() data: ClientesCadastrarDto,
  ) {
    return this.clientesService.atualizarCliente(codigo, data);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualiza o status ativo do cliente' })
  @UseGuards(JwtAuthGuard)
  @Put(':codigo/ativo')
  updateAtivoCliente(
    @Param('codigo', ParseIntPipe) codigo: number,
    @Body() data: ClientesAlterarAtivoDto,
  ) {
    return this.clientesService.updateAtivoCliente(codigo, data);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove um cliente' })
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':codigo')
  deletarCliente(@Param('codigo', ParseIntPipe) codigo: number) {
    return this.clientesService.deletarCliente(codigo);
  }
}
