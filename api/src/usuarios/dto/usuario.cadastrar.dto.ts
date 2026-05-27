import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class UsuarioCadastrarDto {
  @ApiProperty({ example: 'Joao da Silva' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ example: 'joao.silva' })
  @IsString()
  @IsNotEmpty()
  usuario: string;

  @ApiProperty({ example: 'joao@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'senha123', minLength: 6 })
  @IsString()
  @MinLength(6)
  senha: string;

  @ApiProperty({ example: 'Rua das Flores, 100' })
  @IsString()
  @IsNotEmpty()
  endereco: string;

  @ApiProperty({ example: '11999999999' })
  @IsString()
  @IsNotEmpty()
  telefone: string;
}

export class UsuarioAlterarAtivoDto {
  @ApiProperty({ example: true })
  @IsBoolean()
  ativo: boolean;
}
