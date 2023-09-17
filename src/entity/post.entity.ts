import { IsString, Length, Matches } from 'class-validator';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'post' })
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @Length(1, 40)
  @Matches(/^[\s가-힣]+$/)
  title: string;

  @Column('longtext')
  @IsString()
  @Length(1, 2000)
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
