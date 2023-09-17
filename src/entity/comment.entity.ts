import { IsString, Length, Matches } from 'class-validator';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'comment' })
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  postId: number;

  @Column({ nullable: true })
  parent: number;

  @Column('text')
  @IsString()
  @Length(1, 500)
  content: string;

  @Column()
  @IsString()
  @Length(1, 10)
  writer: string;

  @Column()
  @IsString()
  @Length(1, 16)
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{1,16}}$/)
  password: string;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated_at: Date | null;
}
