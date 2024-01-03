const { body, param } = require('express-validator')
const { validate } = require('./validator')

const validateStoreCategory = validate([
    body('name').notEmpty().withMessage('Name is required').isString().withMessage('Name must be a string'),
    // inputan yang lain ...
])

const validateUpdateCategory = validate([
    param('id').notEmpty().withMessage('Param id is required').isInt().withMessage('param id must be a integer'),
    body('name').notEmpty().withMessage('Name is required').isString().withMessage('Name must be a string'),
])

const validateDestroyCategory = validate([
    param('id').notEmpty().withMessage('Param id is required').isInt().withMessage('param id must be a integer')
])

module.exports = {validateStoreCategory, validateUpdateCategory, validateDestroyCategory}