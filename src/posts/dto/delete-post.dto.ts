import { PickType } from '@nestjs/swagger';
import { Post } from '../../entity/post.entity';

export class DeletePostDto extends PickType(Post, ['id', 'password']) {}
