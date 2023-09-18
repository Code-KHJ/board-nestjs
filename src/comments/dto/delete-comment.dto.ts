import { PickType } from '@nestjs/swagger';
import { Comment } from '../../entity/comment.entity';

export class DeleteCommentDto extends PickType(Comment, ['id', 'password']) {}
