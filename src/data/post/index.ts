// @/models.ts
import { Table, Model, Column, DataType, BelongsTo } from 'sequelize-typescript';
import { User } from '@data/user';

@Table({
  timestamps: false,
  tableName: 'post'
})
export class Post extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  title!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  description!: string;

  @BelongsTo(() => User, {
    foreignKey: 'user_id',
    targetKey: 'id'
  })
  public user?: User;
}
