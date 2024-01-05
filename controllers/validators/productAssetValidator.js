const { body, param, check } = require('express-validator')
const { validate } = require('./validator')

const validateStoreProductAsset = validate([
    body('image').custom(
        (value, { req }) => {
            if (!req.file) {
                throw new Error('Image is required')
            }
            return true
        }
    ),
    body('product_id').notEmpty().withMessage('product_id is required').isInt().withMessage('product_id must be a integer'),
])

const validateUpdateProductAsset = validate([
    body('product_id').optional().isInt().withMessage('product_id must be a integer'),
    body('image').custom(
        (value, { req }) => {
            if (!req.file) {
                throw new Error('Image is required')
            }
            return true
        }
    )
])


module.exports = {validateStoreProductAsset,validateUpdateProductAsset}