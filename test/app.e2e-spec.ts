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

    it('/ (Get): 400 잘못된 요청', () => {
      return request(app.getHttpServer())
      .get('/posts')
      .query({ page: 'unvalid' })
      .expect(400);
    });

    it('/ (Get): 200', () => {
      return request(app.getHttpServer())
        .get('/posts')
        .query({
          page: 2,
          title: '게시물',
          content: '게시물',
        })
        .expect(200);
    });

    it(':id (Get): 404 존재하지 않는 게시물', () => {
      return request(app.getHttpServer())
        .get('/posts/' + '10000')
        .expect(404);
    });

    it(':id (Get): 200', () => {
      return request(app.getHttpServer())
        .get('/posts/' + '1')
        .expect(200);
    });

    it(':id (Put): 404 존재하지 않는 게시물', () => {
      return request(app.getHttpServer())
        .put('/posts/' + '10000')
        .send({
          title: '게시물 제목 수정',
          content: '게시물 내용 수정',
          writer: '게시물 작성자 수정',
          password: 'test123!',
        })
        .expect(404);
    });

    it(':id (Put): 401 비밀번호 불일치', () => {
      return request(app.getHttpServer())
        .put('/posts/' + '1')
        .send({
          title: '게시물 제목 수정 테스트',
          content: '게시물 내용 수정 테스트합니다',
          writer: '게시물 작성자',
          password: 'unvalid123!',
        })
        .expect(401);
    });

    it(':id (Put): 200', () => {
      return request(app.getHttpServer())
        .put('/posts/' + '1')
        .send({
          title: '게시물 제목 수정 테스트',
          content: '게시물 내용 수정 테스트합니다',
          writer: '게시물 작성자',
          password: 'valid123!',
        })
        .expect(200);
    });

    it(':id (Delete): 404 존재하지 않는 게시물', () => {
      return request(app.getHttpServer())
        .delete('/posts/' + '10000')
        .send({
          password: 'test123!',
        })
        .expect(404);
    });

    it(':id (Delete): 401 비밀번호 불일치', () => {
      return request(app.getHttpServer())
        .delete('/posts/' + '1')
        .send({
          password: 'unvalid123!',
        })
        .expect(401);
    });

    it(':id (Delete): 200', () => {
      return request(app.getHttpServer())
        .delete('/posts/' + '1')
        .send({
          password: 'valid123!',
        })
        .expect(200);
    });
  });
});
