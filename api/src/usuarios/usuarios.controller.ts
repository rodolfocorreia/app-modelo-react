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
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import {
  UsuarioAlterarAtivoDto,
  UsuarioCadastrarDto,
} from './dto/usuario.cadastrar.dto';
import { UsuariosService } from './usuarios.service';

@ApiTags('usuarios')
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @ApiOperation({ summary: 'Cadastra um novo usuario' })
  @Post()
  cadastrarUsuario(@Body() data: UsuarioCadastrarDto) {
    return this.usuariosService.cadastrarUsuario(data);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Lista todos os usuarios' })
  @UseGuards(JwtAuthGuard)
  @Get()
  listarUsuarios() {
    return this.usuariosService.listarUsuarios();
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Lista um usuario pelo codigo' })
  @UseGuards(JwtAuthGuard)
  @Get(':codigo')
  listarUsuarioById(@Param('codigo', ParseIntPipe) codigo: number) {
    return this.usuariosService.listarUsuarioById(codigo);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualiza o status ativo do usuario' })
  @UseGuards(JwtAuthGuard)
  @Patch(':codigo/ativo')
  updateAtivoUsuario(
    @Param('codigo', ParseIntPipe) codigo: number,
    @Body() data: UsuarioAlterarAtivoDto,
  ) {
    return this.usuariosService.updateAtivoUsuario(codigo, data);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove um usuario' })
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':codigo')
  deletarUsuario(@Param('codigo', ParseIntPipe) codigo: number) {
    return this.usuariosService.deletarUsuario(codigo);
  }
}
