import { Application } from 'express';
import { PostController } from '../controllers/posts/post.controller';

export default function registerRoutes(app: Application): void {
  new PostController(app);
}
