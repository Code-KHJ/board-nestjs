export class PostsResponseDto {
  constructor(
    public id: number,
    public title: string,
    public writer: string,
    public content: string,
    public commentCount: number,
  ) {}
}
