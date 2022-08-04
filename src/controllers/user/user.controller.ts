import { ResponseBuilder } from '@utils/ResponseBuilder';
import { Application, Request, Response } from 'express';
import BaseApi from '@utils/BaseApi';
import { BodyValidator } from '@utils/BodyValidator';
import { CreateUserDTO } from '@controllers/user/user.dto';
import { User } from '@data/index';

export class UserController extends BaseApi {
  constructor(app: Application) {
    super();
    this.register(app);
  }

  public register(app: Application): void {
    app.use('/api/v1/users', this.router);
    this.router.post('/', CreateUserDTO(), this.addUser);
  }

  @BodyValidator()
  public async addUser(_req: Request, _res: Response) {
    const body = _req.body;
    await User.create(body);
    return ResponseBuilder.successResponse(_res, {});
  }
}
