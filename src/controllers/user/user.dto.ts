import { body } from 'express-validator';

export const CreateUserDTO = () => {
  return [body('username').isString().withMessage('userna,e should be string')];
};
