import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../entity/post.entity';
import { Comment } from '../entity/comment.entity';
import { FindManyOptions, Like, Repository, SelectQueryBuilder } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { CreateResponseDto } from './dto/create-response.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UpdateResponseDto } from './dto/update-response.dto';
import { DeletePostDto } from './dto/delete-post.dto';
import { FindOnePostDto } from './dto/findone-post.dto';
import { GetPostsDto } from './dto/get-posts.dto';
import { PostsResponseDto } from './dto/posts-response.dto';
import bcrypt from 'bcrypt';

const salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS));

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<CreateResponseDto> {
    createPostDto.password = bcrypt.hashSync(createPostDto.password, salt);
    try {
      const post = await this.postRepository.create(createPostDto);
      await this.postRepository.save(post);
      return new CreateResponseDto(post);
    } catch (err) {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<UpdateResponseDto> {
    const { title, content, writer, password } = updatePostDto;
    const post = await this.postRepository.findOneBy({ id: id });

    if (!post) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    const match = await bcrypt.compare(password, post.password);
    if (!match) {
      throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
    }

    post.title = title;
    post.content = content;
    post.writer = writer;

    try {
      await this.postRepository.save(post);
      return new UpdateResponseDto(post);
    } catch (err) {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }
  }

  async delete(deletePostDto: DeletePostDto) {
    const { id, password } = deletePostDto;
    const post = await this.postRepository.findOneBy({ id: id });

    if (!post) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    const match = await bcrypt.compare(password, post.password);
    if (!match) {
      throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
    }

    try {
      await this.postRepository.remove(post);
      return '게시글 삭제 완료';
    } catch (err) {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: number): Promise<FindOnePostDto> {
    const post = await this.postRepository.findOneBy({ id: id });
    if (!post) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }
    return new FindOnePostDto(post);
  }

  async findAll(getPostsDto: GetPostsDto) {
    let { title, content, writer, page } = getPostsDto;
    const take = 10;
    if (page === undefined) {
      page = 1;
    }
    const skip = (page - 1) * take;

    if (title === undefined) {
      title = '';
    }
    if (content === undefined) {
      content = '';
    }
    if (writer === undefined) {
      writer = '';
    }

    const options: FindManyOptions<Post> = {
      where: {
        title: Like(`%${title}%`),
        writer: Like(`%${writer}%`),
        content: Like(`%${content}%`),
      },
      take,
      skip,
      order: { created_at: 'DESC' },
    };
    const posts = await this.postRepository.find(options);

    /////댓글 갯수 넣는 것 추가해야해!!!!

    const result: PostsResponseDto[] = [];

    for (const post of posts) {
      const commentCount = await this.commentRepository
        .createQueryBuilder('comment')
        .select('COUNT(*) as count')
        .where(`comment.postId = ${post.id}`)
        .andWhere('comment.parent IS NULL')
        .getRawOne();
      const postItem = new PostsResponseDto(post.id, post.title, post.writer, post.content.slice(0, 10), commentCount.count);
      result.push(postItem);
    }

    return result;
  }
}
