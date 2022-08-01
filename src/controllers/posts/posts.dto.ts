import { body } from 'express-validator';

export const CreatePostDTO = () => {
  return [
    body('title').isString().withMessage('title should be string'),
    body('description').isString().withMessage('description should be string')
  ];
};
