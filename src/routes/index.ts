import { Application } from 'express';
import { PostController } from '@controllers/posts/post.controller';
import { UserController } from '@controllers/user/user.controller';

export default function registerRoutes(app: Application): void {
  new PostController(app);
  new UserController(app);
}
