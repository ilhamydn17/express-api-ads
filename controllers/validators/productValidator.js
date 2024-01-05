const { body, param } = require('express-validator')
const { validate } = require('./validator')

const validateStoreProduct = validate([
    body('name').notEmpty().withMessage('Name is required').isString().withMessage('Name must be a string'),
    body('price').notEmpty().withMessage('Price is required').isInt().withMessage('Price must be a number'),
])

const validateUpdateProduct = validate([
    body('name').optional().isString().withMessage('Name must be a string'),
    body('price').optional().isInt().withMessage('Price must be a number'),
])


module.exports = {validateStoreProduct, validateUpdateProduct}