import { NextFunction, Request, Response } from 'express';
import { body, param, validationResult } from 'express-validator';

export const validateTask = [
  body('title').notEmpty().withMessage('Title is required'),
  body('content').optional(),
];

export const validateComment = [
  body('content').notEmpty().withMessage('Comment content is required'),
];

export const validateId = [
  param('id').isInt().withMessage('Invalid ID'),
];

export const validate = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};