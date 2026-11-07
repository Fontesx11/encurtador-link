import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Link } from './link.entity';

@Entity({ name: 'access' })
export class Access {
  @PrimaryGeneratedColumn('identity', { generatedIdentity: 'ALWAYS' })
  id: number;

  @Column({ name: 'user_agent', type: 'text', nullable: true })
  userAgent: string | null;

  @Column({ name: 'ip_address', type: 'inet' })
  ipAddress: string;

  @ManyToOne(() => Link, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'link_id' })
  link: Link;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;
}
