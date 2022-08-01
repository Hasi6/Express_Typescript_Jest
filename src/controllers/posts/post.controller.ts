import { ResponseBuilder } from './../../utils/ResponseBuilder';
import { Application, Request, Response } from 'express';
import BaseApi from '../../utils/BaseApi';
export class PostController extends BaseApi {
  constructor(app: Application) {
    super();
    this.register(app);
  }

  public register(app: Application): void {
    app.use('/api/v1/posts', this.router);
    this.router.get('/', this.getPosts);
  }

  public getPosts(req: Request, res: Response) {
    return ResponseBuilder.successResponse(res, []);
  }
}
