import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class GetPostsDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  writer: string;

  @IsOptional()
  @IsString()
  content: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  page: number;
}
