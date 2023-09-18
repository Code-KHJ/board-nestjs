import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Length, Matches } from 'class-validator';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'comment' })
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNumber()
  @Type(() => Number)
  postId: number;

  @Column({ nullable: true })
  @IsNumber()
  @IsOptional()
  parent: number;

  @Column('text')
  @IsString()
  @Length(1, 500)
  @Matches(/^[\s가-힣]+$/)
  content: string;

  @Column()
  @IsString()
  @Length(1, 10)
  @Matches(/^[\s가-힣]+$/)
  writer: string;

  @Column()
  @IsString()
  @Length(1, 16)
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{1,16}$/)
  password: string;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated_at: Date | null;
}
