import { Application } from 'express';
import { PostController } from '@controllers/posts/post.controller';
import { UserController } from '@controllers/user/user.controller';
import { PersonController } from '@controllers/person/person.controller';

export default function registerRoutes(app: Application): void {
  new PersonController(app);
  new PostController(app);
  new UserController(app);
}
