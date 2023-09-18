import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { DeletePostDto } from './dto/delete-post.dto';
import { GetPostsDto } from './dto/get-posts.dto';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get('/')
  @ApiOperation({ summary: '게시글 전체 조회' })
  @ApiResponse({
    status: 200,
    description: '전체 조회 성공',
  })
  getAllPosts(@Query() getPostsDto: GetPostsDto) {
    return this.postsService.findAll(getPostsDto);
  }

  @Get(':id')
  @ApiOperation({ summary: '게시글 조회' })
  @ApiResponse({
    status: 200,
    description: '조회 성공',
  })
  getPost(@Param('id') id: number) {
    return this.postsService.findOne(id);
  }

  @Post('/')
  @ApiOperation({ summary: '게시글 작성' })
  @ApiResponse({
    status: 201,
    description: '작성 성공',
  })
  createPost(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Put(':id')
  @ApiOperation({ summary: '게시글 수정' })
  @ApiResponse({
    status: 200,
    description: '수정 성공',
  })
  updatePost(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '게시글 삭제' })
  @ApiResponse({
    status: 200,
    description: '삭제 성공',
  })
  deletePost(@Param('id') id: number, @Body() deletePostDto: DeletePostDto) {
    deletePostDto.id = id;
    return this.postsService.delete(deletePostDto);
  }
}
