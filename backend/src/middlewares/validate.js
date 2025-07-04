import { validationResult } from 'express-validator'

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed')
    error.statusCode = 400
    error.details = errors.array()
    return next(error)
  }
  next()
}

export default validate