import { OmitType } from '@nestjs/swagger';
import { CreateCommentDto } from './create-comment.dto';
import { Comment } from '../../entity/comment.entity';

export class CreateResponseDto extends OmitType(Comment, ['id', 'password', 'created_at', 'updated_at']) {
  constructor(postId: number, requestDto: CreateCommentDto) {
    super();
    const { parent, content, writer } = requestDto;
    this.parent = parent;
    this.content = content;
    this.writer = writer;
    this.postId = postId;
  }
}
