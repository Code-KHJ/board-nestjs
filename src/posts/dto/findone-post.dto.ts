import { OmitType } from '@nestjs/swagger';
import { Post } from '../../entity/post.entity';

export class FindOnePostDto extends OmitType(Post, ['password']) {
  constructor(requestDto: Post) {
    super();
    const { id, title, content, writer, created_at, updated_at } = requestDto;
    this.id = id;
    this.title = title;
    this.content = content;
    this.writer = writer;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
