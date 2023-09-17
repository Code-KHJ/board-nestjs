import { OmitType } from '@nestjs/swagger';
import { Post } from '../../entity/post.entity';
import { UpdatePostDto } from './update-post.dto';

export class UpdateResponseDto extends OmitType(Post, ['id', 'password', 'created_at', 'updated_at']) {
  constructor(requestDto: UpdatePostDto) {
    super();
    const { title, content, writer } = requestDto;
    this.title = title;
    this.content = content;
    this.writer = writer;
  }
}
