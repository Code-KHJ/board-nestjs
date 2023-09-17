export class PostsResponseDto {
  // @IsNumber()
  // commentCount: number;

  constructor(
    public id: number,
    public title: string,
    public writer: string,
    public content: string,
  ) {}
}
