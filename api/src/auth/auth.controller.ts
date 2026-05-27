import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import { LoginDto } from './dto/login.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService, UsuarioAutenticado } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Autentica o usuario e retorna o token de acesso' })
  @ApiBody({ type: LoginDto })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@CurrentUser() user: UsuarioAutenticado) {
    return this.authService.login(user);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Retorna o usuario do token autenticado' })
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@CurrentUser('userId') userId: number) {
    return this.authService.carregarUsuarioAtual(userId);
  }
}
