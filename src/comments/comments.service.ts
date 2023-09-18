import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from '../entity/comment.entity';
import { Post } from '../entity/post.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import bcrypt from 'bcrypt';
import { CreateResponseDto } from './dto/create-response.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { UpdateResponseDto } from './dto/update-response.dto';
import { DeleteCommentDto } from './dto/delete-comment.dto';
import { GetCommentsDto } from './dto/get-comments.dto';
import { CommentsResponseDto } from './dto/comments-response.dto';

const salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS));

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async create(postId: number, createCommentDto: CreateCommentDto): Promise<CreateResponseDto> {
    const post = await this.postRepository.findOneBy({
      id: postId,
    });
    if (!post) {
      throw new HttpException('NOT_FOUND POST', HttpStatus.NOT_FOUND);
    }

    if (createCommentDto.parent !== undefined) {
      const parentComment = await this.commentRepository.findOneBy({
        id: createCommentDto.parent,
        postId: postId,
      });
      if (parentComment === null) {
        throw new HttpException('NOT_FOUND PARENT', HttpStatus.NOT_FOUND);
      }
    }

    createCommentDto.password = bcrypt.hashSync(createCommentDto.password, salt);
    try {
      const comment = await this.commentRepository.create({
        postId,
        ...createCommentDto,
      });
      await this.commentRepository.save(comment);
      return new CreateResponseDto(postId, comment);
    } catch (err) {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }
  }

  async update(postId: number, id: number, updateCommentDto: UpdateCommentDto): Promise<UpdateResponseDto> {
    const { content, writer, password } = updateCommentDto;
    const comment = await this.commentRepository.findOneBy({ id: id });
    if (!comment) {
      throw new HttpException('NOT_FOUND COMMENT', HttpStatus.NOT_FOUND);
    }

    if (comment.postId !== postId) {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }

    const match = await bcrypt.compare(password, comment.password);
    if (!match) {
      throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
    }

    comment.content = content;
    comment.writer = writer;

    try {
      await this.commentRepository.save(comment);
      return new UpdateResponseDto(comment);
    } catch (err) {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }
  }

  async delete(deleteCommentDto: DeleteCommentDto) {
    const { id, password } = deleteCommentDto;
    const comment = await this.commentRepository.findOneBy({ id: id });

    if (!comment) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    const match = await bcrypt.compare(password, comment.password);
    if (!match) {
      throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
    }

    try {
      await this.commentRepository.remove(comment);
      return '댓글 삭제 완료';
    } catch (err) {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(postId: number, getCommentsDto: GetCommentsDto) {
    let { page } = getCommentsDto;
    const take = 10;
    if (page === undefined) {
      page = 1;
    }
    const skip = (page - 1) * take;

    const options: FindManyOptions<Comment> = {
      where: {
        postId: postId,
      },
      take,
      skip,
      order: { created_at: 'DESC' },
    };

    const comments = await this.commentRepository.find(options);

    const result: CommentsResponseDto[] = [];

    for (const comment of comments) {
      const commentItem = new CommentsResponseDto(comment);
      result.push(commentItem);
    }

    return result;
  }
}
