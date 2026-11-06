import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'links' })
export class Link {
  @PrimaryGeneratedColumn('identity', { generatedIdentity: 'ALWAYS' })
  id: number;

  @Column({ name: 'original_link', type: 'text' })
  originalLink: string;

  @Column({ name: 'short_code', type: 'text', unique: true })
  shortCode: string;

  @Column({ name: 'click_count', type: 'integer', default: 0 })
  clickCount: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @DeleteDateColumn({ name: 'excluido_em', type: 'timestamptz' })
  deletedAt: Date | null;
}
