import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { RefreshTokenDto } from './dto/refresh.token.dto';
import { TokenService } from './token.service';

@ApiTags('token')
@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @ApiOperation({ summary: 'Gera um novo token a partir do token anterior' })
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refreshToken(@Body() data: RefreshTokenDto) {
    return this.tokenService.refreshToken(data.oldToken);
  }
}
