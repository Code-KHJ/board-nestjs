import { OmitType } from '@nestjs/swagger';
import { Comment } from '../../entity/comment.entity';

export class CommentsResponseDto extends OmitType(Comment, ['password']) {
  constructor(requestDto: Comment) {
    super();
    const { id, postId, parent, content, writer, created_at, updated_at } = requestDto;
    this.id = id;
    this.postId = postId;
    this.parent = parent;
    this.content = content;
    this.writer = writer;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
