import { Sequelize } from 'sequelize-typescript';
import { Post } from '@data/post';
import { User } from '@data/user';

const connection = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite',
  logging: false,
  models: [Post, User]
});

export default connection;
export { Post, User };
