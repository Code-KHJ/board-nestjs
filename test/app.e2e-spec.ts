import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('게시글 CRUD', () => {
    it('/posts (Post): 201', () => {
      return request(app.getHttpServer())
        .post('/posts')
        .send({
          id: 1,
          title: '게시물 제목',
          content: '게시물 내용',
          writer: '게시물 작성자',
          password: 'valid123!',
        })
        .expect(201);
    });

    it('/posts (Post): 400', () => {
      return request(app.getHttpServer())
        .post('/posts')
        .send({
          title: '게시물 제목',
          content: '게시물 내용',
          writer: '게시물 작성자',
          password: 'unvalid',
        })
        .expect(400);
    });

    it('/posts (Get): 400 잘못된 요청', () => {
      return request(app.getHttpServer()).get('/posts').query({ page: 'unvalid' }).expect(400);
    });

    it('/posts (Get): 200', () => {
      return request(app.getHttpServer())
        .get('/posts')
        .query({
          page: 2,
          title: '게시물',
          content: '게시물',
        })
        .expect(200);
    });

    it('/posts/:id (Get): 200', () => {
      return request(app.getHttpServer())
        .get('/posts/' + '1')
        .expect(200);
    });

    it('/posts/:id (Put): 401 비밀번호 불일치', () => {
      return request(app.getHttpServer())
        .put('/posts/1')
        .send({
          title: '게시물 제목 수정 테스트',
          content: '게시물 내용 수정 테스트합니다',
          writer: '게시물 작성자',
          password: 'unvalid123!',
        })
        .expect(401);
    });

    it('/posts/:id (Put): 200', () => {
      return request(app.getHttpServer())
        .put('/posts/1')
        .send({
          title: '게시물 제목 수정 테스트',
          content: '게시물 내용 수정 테스트합니다',
          writer: '게시물 작성자',
          password: 'valid123!',
        })
        .expect(200);
    });

    it('/posts/:id (Delete): 401 비밀번호 불일치', () => {
      return request(app.getHttpServer())
        .delete('/posts/1')
        .send({
          password: 'unvalid123!',
        })
        .expect(401);
    });

    it('/posts/:id (Delete): 200', () => {
      return request(app.getHttpServer())
        .delete('/posts/1')
        .send({
          password: 'valid123!',
        })
        .expect(200);
    });

    it('/posts/:id (Get): 404 존재하지 않는 게시물', () => {
      return request(app.getHttpServer()).get('/posts/1').expect(404);
    });

    it('/posts/:id (Delete): 404 존재하지 않는 게시물', () => {
      return request(app.getHttpServer())
        .delete('/posts/1')
        .send({
          password: 'test123!',
        })
        .expect(404);
    });

    it('/posts/:id (Put): 404 존재하지 않는 게시물', () => {
      return request(app.getHttpServer())
        .put('/posts/1')
        .send({
          title: '게시물 제목 수정',
          content: '게시물 내용 수정',
          writer: '게시물 작성자 수정',
          password: 'test123!',
        })
        .expect(404);
    });
  });

  describe('댓글 CRUD', () => {
    it('/posts (Post): 201', () => {
      return request(app.getHttpServer())
        .post('/posts')
        .send({
          id: 2,
          title: '게시물 제목',
          content: '게시물 내용',
          writer: '게시물 작성자',
          password: 'valid123!',
        })
        .expect(201);
    });

    it('/comments/:postId (Post): 201', () => {
      return request(app.getHttpServer())
        .post('/comments/2')
        .send({
          id: 1,
          content: '테스트 댓글 내용',
          writer: '댓글 작성자',
          password: 'valid123!',
        })
        .expect(201);
    });

    it('/comments/:postId (Post): 404 존재하지 않는 게시물', () => {
      return request(app.getHttpServer())
        .post('/comments/1')
        .send({
          content: '테스트 댓글 내용',
          writer: '댓글 작성자',
          password: 'valid123!',
        })
        .expect({ statusCode: 404, message: 'NOT_FOUND POST' });
    });

    it('/comments/:postId (Post): 404 존재하지 않는 부모 댓글', () => {
      return request(app.getHttpServer())
        .post('/comments/2')
        .send({
          parent: 10000,
          content: '테스트 댓글 내용',
          writer: '댓글 작성자',
          password: 'valid123!',
        })
        .expect({ statusCode: 404, message: 'NOT_FOUND PARENT' });
    });

    it('/comments/:postId (Post): 201 답글 작성', () => {
      return request(app.getHttpServer())
        .post('/comments/2')
        .send({
          parent: 1,
          content: '테스트 답글 내용',
          writer: '답글 작성자',
          password: 'valid123!',
        })
        .expect(201);
    });

    it('/comments/:postId/:id (Get): 200', () => {
      return request(app.getHttpServer()).get('/comments/2').query({ page: 1 }).expect(200);
    });

    it('/comments/:postId/:id (Put): 200', () => {
      return request(app.getHttpServer())
        .put('/comments/2/1')
        .send({
          content: '테스트 댓글 수정',
          writer: '댓글 작성자',
          password: 'valid123!',
        })
        .expect(200);
    });

    it('/comments/:postId/:id (Put): 400 게시글번호와 댓글번호 알맞지 않음', () => {
      return request(app.getHttpServer())
        .put('/comments/10000/1')
        .send({
          content: '테스트 댓글 수정',
          writer: '댓글 작성자',
          password: 'valid123!',
        })
        .expect(400);
    });

    it('/comments/:postId/:id (Put): 401 비밀번호 불일치', () => {
      return request(app.getHttpServer())
        .put('/comments/2/1')
        .send({
          content: '테스트 댓글 수정',
          writer: '댓글 작성자',
          password: 'unvalid123!',
        })
        .expect(401);
    });

    it('/comments/:postId/:id (Delete): 401 비밀번호 불일치', () => {
      return request(app.getHttpServer())
        .delete('/comments/2/1')
        .send({
          password: 'unvalid123!',
        })
        .expect(401);
    });

    it('/comments/:postId/:id (Delete): 200', () => {
      return request(app.getHttpServer())
        .delete('/comments/2/1')
        .send({
          password: 'valid123!',
        })
        .expect(200);
    });

    it('/comments/:postId/:id (Put): 404 존재하지 않는 댓글', () => {
      return request(app.getHttpServer())
        .put('/comments/2/1')
        .send({
          content: '테스트 댓글 수정',
          writer: '댓글 작성자',
          password: 'valid123!',
        })
        .expect({ statusCode: 404, message: 'NOT_FOUND COMMENT' });
    });

    it('/comments/:postId/:id (Delete): 404 존재하지 않는 게시물', () => {
      return request(app.getHttpServer())
        .delete('/comments/2/1')
        .send({
          password: 'valid123!',
        })
        .expect(404);
    });
  });
});
