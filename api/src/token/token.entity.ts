import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'token' })
@Index('IDX_token_hash', ['hash'])
export class Token {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 512 })
  hash: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;
}
