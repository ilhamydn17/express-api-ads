const express = require('express');
const route = express.Router();
const { upload } = require('../controllers/middlewares/upload');
const handleCategory = require('../controllers/categoryController');
const handleProduct = require('../controllers/productController');
const handleProductAsset = require('../controllers/productAssetController');

// endpoin category
route.post('/category', handleCategory.storeCategory);
route.get('/category', handleCategory.getCategories);
route.put('/category/:id', handleCategory.updateCategory);
route.delete('/category/:id', handleCategory.destroyCategory);

// endpoint product
route.post('/product', handleProduct.storeProduct);
route.get('/product/:byPrice', handleProduct.getProduct);
route.put('/product/:id', handleProduct.updateProduct);
route.delete('/product/:id', handleProduct.destroyProduct);

// endpoint asset product
route.post(
	'/product-asset',
	(req, res, next) => {
		upload.single('image')(req, res, err => {
			if (err) {
				res.status(400).json({ message: err.message });
				return;
			}
			next();
		});
	},
	handleProductAsset.storeProductAsset
)
route.get('/product-asset', handleProductAsset.getProductAsset)
route.put(
	'/product-asset/:id',
	(req, res, next) => {
		upload.single('image')(req, res, err => {
			if (err) {
				res.status(400).json({ message: err.message });
				return;
			}
			next();
		});
	},
	handleProductAsset.updateProductAsset
)
route.delete('/product-asset/:id', handleProductAsset.destroyProductAsset)

module.exports = route;
