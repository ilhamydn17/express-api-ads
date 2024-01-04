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
    )
    // inputan yang lain ...
])

const validateUpdateProductAsset = validate([
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