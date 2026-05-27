import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @ApiProperty({ description: 'Token JWT atual (a ser renovado)' })
  oldToken: string;
}
