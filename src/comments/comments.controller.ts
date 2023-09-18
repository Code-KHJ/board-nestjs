import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { DeleteCommentDto } from './dto/delete-comment.dto';
import { GetCommentsDto } from './dto/get-comments.dto';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Get(':postId')
  @ApiOperation({ summary: '댓글 전체 조회' })
  @ApiResponse({
    status: 200,
    description: '전체 조회 성공',
  })
  getComments(@Param('postId', ParseIntPipe) postId: number, @Query() getCommentsDto: GetCommentsDto) {
    return this.commentsService.findAll(postId, getCommentsDto);
  }

  @Post(':postId')
  @ApiOperation({ summary: '댓글 작성' })
  @ApiResponse({
    status: 201,
    description: '작성 성공',
  })
  createComment(@Param('postId', ParseIntPipe) postId: number, @Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(postId, createCommentDto);
  }

  @Put(':postId/:id')
  @ApiOperation({ summary: '댓글 수정' })
  @ApiResponse({
    status: 200,
    description: '수정 성공',
  })
  updateComment(@Param('postId', ParseIntPipe) postId: number, @Param('id', ParseIntPipe) id: number, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(postId, id, updateCommentDto);
  }

  @Delete(':postId/:id')
  @ApiOperation({ summary: '댓글 삭제' })
  @ApiResponse({
    status: 200,
    description: '삭제 성공',
  })
  deleteComment(@Param('postId', ParseIntPipe) postId: number, @Param('id', ParseIntPipe) id: number, @Body() deleteCommentDto: DeleteCommentDto) {
    deleteCommentDto.id = id;
    return this.commentsService.delete(deleteCommentDto);
  }
}
