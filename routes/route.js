const express = require('express')
const route = express.Router()
const handleCategory = require('../controllers/categoryController')
const handleProduct = require('../controllers/productController')

// endpoin category
route.post('/category', handleCategory.storeCategory)
route.get('/category', handleCategory.getCategories)
route.put('/category/:id', handleCategory.updateCategory)
route.delete('/category/:id', handleCategory.destroyCategory)

// endpoint product
route.post('/product', handleProduct.storeProduct)
route.get('/product', handleProduct.getProduct)
route.put('/product/:id', handleProduct.updateProduct)
route.delete('/product/:id', handleProduct.destroyProduct)

module.exports = route