import { OmitType } from '@nestjs/swagger';
import { Post } from '../../entity/post.entity';

export class CreatePostDto extends OmitType(Post, ['id', 'updated_at']) {}
