import { ResponseBuilder } from './../../utils/ResponseBuilder';
import { Application, Request, Response } from 'express';
import BaseApi from '../../utils/BaseApi';
import { BodyValidator } from '../../utils/BodyValidator';
import { CreatePostDTO } from './posts.dto';
import { defaultRateLimitter, RateLimitter } from '../../middlewares/rate-limmiter';

interface Post {
  id: number;
  title: string;
  description: string;
}

let posts: Post[] = [];

export class PostController extends BaseApi {
  constructor(app: Application) {
    super();
    this.register(app);
  }

  public register(app: Application): void {
    app.use('/api/v1/posts', this.router);
    this.router.get('/', this.getPosts);
    this.router.post('/', CreatePostDTO(), this.addPosts);
  }

  @RateLimitter(defaultRateLimitter)
  public getPosts(_req: Request, _res: Response) {
    return ResponseBuilder.successResponse(_res, posts);
  }

  @BodyValidator()
  public addPosts(_req: Request, _res: Response) {
    const body = <Post>_req.body;
    posts = [...posts, { id: posts.length + 1, ...body }];
    // @ts-ignore
    global.io.emit(body.title, body);
    return ResponseBuilder.successResponse(_res, posts);
  }
}
