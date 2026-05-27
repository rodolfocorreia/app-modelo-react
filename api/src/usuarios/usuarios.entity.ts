import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tb_cad_usuario' })
@Index('IDX_tb_cad_usuario_email', ['email'], { unique: true })
@Index('IDX_tb_cad_usuario_usuario', ['usuario'], { unique: true })
export class Usuarios {
  @PrimaryGeneratedColumn({ type: 'int' })
  codigo: number;

  @Column({ type: 'varchar', length: 100 })
  nome: string;

  @Column({ type: 'varchar', length: 100 })
  usuario: string;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  telefone: string;

  @Column({ type: 'varchar', length: 200 })
  endereco: string;

  @Column({ type: 'varchar', length: 255, select: false })
  senha: string;

  @Column({ type: 'boolean', default: true })
  ativo: boolean;
}
