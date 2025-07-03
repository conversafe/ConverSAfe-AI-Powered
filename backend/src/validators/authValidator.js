import { body } from 'express-validator'
import { USER_ROLES } from '../models/userModel.js'

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
  body('name')
    .notEmpty().withMessage('Name is required'),
  body('age')
    .notEmpty().withMessage('Age is required')
    .isInt({ min: 0 }).withMessage('Age must be a positive integer'),
  body('role')
    .notEmpty().withMessage('Role is required')
    .isIn(USER_ROLES).withMessage(`Role must be one of: ${USER_ROLES.join(', ')}`)
]