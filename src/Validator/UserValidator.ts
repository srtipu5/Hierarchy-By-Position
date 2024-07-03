import { body } from 'express-validator'
import { ValidatorMiddleware } from '../Middleware/ValidatorMiddleware';

export const UserValidator = ValidatorMiddleware([
    body('username')
    .isString().withMessage('Username must be a string')
    .notEmpty().withMessage('Username cannot be empty')
    .trim(),
    body('password')
    .isString().withMessage('Password must be a string')
    .notEmpty().withMessage('Password cannot be empty')
    .trim(),
])
