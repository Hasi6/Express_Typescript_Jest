// @/models.ts
import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript';
import { Post } from '@data/post';

@Table({
  timestamps: false,
  tableName: 'user'
})
export class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  username!: string;

  @HasMany(() => Post, {
    foreignKey: 'user_id',
    sourceKey: 'id'
  })
  posts: Post[];
}
