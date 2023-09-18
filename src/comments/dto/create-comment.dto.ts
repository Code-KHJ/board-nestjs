import { OmitType } from '@nestjs/swagger';
import { Comment } from '../../entity/comment.entity';

export class CreateCommentDto extends OmitType(Comment, ['id', 'postId', 'updated_at']) {}
