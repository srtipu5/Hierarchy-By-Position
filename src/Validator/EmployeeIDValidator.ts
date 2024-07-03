import { query } from 'express-validator';
import { ValidatorMiddleware } from '../Middleware/ValidatorMiddleware';

export const EmployeeIDValidator = ValidatorMiddleware([
  query('id')
    .isInt().withMessage('ID must be an integer')
    .toInt(),
])