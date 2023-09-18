import { OmitType } from '@nestjs/swagger';
import { UpdateCommentDto } from './update-comment.dto';
import { Comment } from '../../entity/comment.entity';

export class UpdateResponseDto extends OmitType(Comment, ['id', 'postId', 'password', 'created_at', 'updated_at']) {
  constructor(requestDto: UpdateCommentDto) {
    super();
    const { parent, content, writer } = requestDto;
    this.parent = parent;
    this.content = content;
    this.writer = writer;
  }
}
