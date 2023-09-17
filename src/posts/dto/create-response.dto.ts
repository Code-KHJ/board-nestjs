import { OmitType } from '@nestjs/swagger';
import { Post } from '../../entity/post.entity';
import { CreatePostDto } from './create-post.dto';

export class CreateResponseDto extends OmitType(Post, ['id', 'password', 'created_at', 'updated_at']) {
  constructor(requestDto: CreatePostDto) {
    super();
    const { title, content, writer } = requestDto;
    this.title = title;
    this.content = content;
    this.writer = writer;
  }
}
