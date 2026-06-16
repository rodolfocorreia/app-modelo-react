import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tb_cad_clientes' })
@Index('IDX_tb_cad_clientes_email', ['email'], { unique: true })
@Index('IDX_tb_cad_clientes_cpf_cnpj', ['cpf_cnpj'], { unique: true })
export class Clientes {
  @PrimaryGeneratedColumn({ type: 'int' })
  codigo: number;

  @Column({ type: 'varchar', length: 100 })
  nome: string;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  telefone: string;

  @Column({ type: 'varchar', length: 20 })
  cpf_cnpj: string;

  @Column({ type: 'varchar', length: 200 })
  endereco: string;

  @Column({ type: 'varchar', length: 100 })
  cidade: string;

  @Column({ type: 'varchar', length: 2 })
  estado: string;

  @Column({ type: 'varchar', length: 20 })
  cep: string;

  @Column({ type: 'boolean', default: true })
  ativo: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  data_cadastro: Date;
}
