import { Post } from '@data/index';
import { ResponseBuilder } from '@utils/ResponseBuilder';
import { Application, Request, Response } from 'express';
import BaseApi from '@utils/BaseApi';
import { BodyValidator } from '@utils/BodyValidator';
import { CreatePostDTO } from '@controllers/posts/posts.dto';
import { boostrapPersonSchema } from '@entity/Person';

export class PersonController extends BaseApi {
  constructor(app: Application) {
    super();
    this.register(app);
  }

  public register(app: Application): void {
    app.use('/api/v1/person', this.router);
    this.router.get('/', this.getPosts);
    this.router.post('/', CreatePostDTO(), this.addPosts);
  }

  public async getPosts(_req: Request, _res: Response) {
    const person = await (
      await boostrapPersonSchema()
    ).createAndSave({
      firstName: 'type',
      lastName: 'type',
      age: 'type',
      verified: 'type',
      location: 'type',
      locationUpdated: 'type',
      skills: 'type',
      personalStatement: 'type'
    });
    console.log('ass', person.entityId);
    return ResponseBuilder.successResponse(_res, person);
  }

  @BodyValidator()
  public async addPosts(_req: Request, _res: Response) {
    const body = _req.body;
    await Post.create(body);
    // @ts-ignore
    global.io.emit(body.title, body);
    return ResponseBuilder.successResponse(_res, {});
  }
}
