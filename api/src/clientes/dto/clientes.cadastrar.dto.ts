import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

export class ClientesCadastrarDto {
  @ApiProperty({ example: 'Joao da Silva' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ example: 'joao@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '11999999999' })
  @IsString()
  @IsNotEmpty()
  telefone: string;

  @ApiProperty({ example: '12345678900' })
  @IsString()
  @IsNotEmpty()
  cpf_cnpj: string;

  @ApiProperty({ example: 'Rua das Flores, 100' })
  @IsString()
  @IsNotEmpty()
  endereco: string;

  @ApiProperty({ example: 'Sao Paulo' })
  @IsString()
  @IsNotEmpty()
  cidade: string;

  @ApiProperty({ example: 'SP' })
  @IsString()
  @Length(2, 2)
  estado: string;

  @ApiProperty({ example: '01000-000' })
  @IsString()
  @IsNotEmpty()
  cep: string;
}

export class ClientesAlterarAtivoDto {
  @ApiProperty({ example: true })
  @IsBoolean()
  ativo: boolean;
}
