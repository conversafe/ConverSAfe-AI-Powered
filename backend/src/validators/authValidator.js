import { body } from 'express-validator'

export const loginValidation = [
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid Email'),
  body('password').notEmpty().withMessage('Password is required')
]

export const registerValidation = [
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid Email'),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must have at least 6 characters'),
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required')
]