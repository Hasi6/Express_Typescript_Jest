import { Sequelize } from 'sequelize-typescript';
import { Post } from '@data/post';

const connection = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite',
  logging: false,
  models: [Post]
});

export default connection;
export { Post };
