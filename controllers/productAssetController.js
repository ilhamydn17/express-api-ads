const ProductAsset = require('../models').ProductAsset;
const Product = require('../models').Product;
const { validationResult } = require('express-validator');
const productAssetValidator = require('../controllers/validators/productAssetValidator');
const { upload } = require('../controllers/middlewares/upload');

const fs = require('fs');
const path = require('path');

const storeProductAsset = [
	productAssetValidator.validateStoreProductAsset,
	async (req, res) => {
		console.log(req.file)
		try {
			const productId = req.body.product_id;
			const fileName = req.file.filename;
	
			const data = await ProductAsset.create({
				product_id: productId,
				image: fileName,
			});
			res.status(201).json({
				message: 'Data successfully created',
				data: {
					product_id: data.product_id,
					image: data.image
				},
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({
				message: 'Failed to insert data',
			});
		}
	}
]

const getProductAsset = async (req, res) => {
	try {
		const getDatas = await ProductAsset.findAll({
			attributes: ['product_id','image',],
			include: [
				{ model: Product, as: 'product', attributes: ['name'] },
			],
		  });
		if (getDatas) {
			res.status(200).json({
				message: 'Data successfully retrieved',
				data: getDatas,
			});
		} else {
			res.status(404).json({
				message: 'Data not found',
			});
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Failed to retrieve data, internal server error',
		});
	}
};
	

const updateProductAsset = [
	productAssetValidator.validateUpdateProductAsset,
	async (req, res) => {
		try {
			data = await ProductAsset.findOne({ where: { id: req.params.id } });
			if (data) {
				// mencari data gambar yang sudah ada/diupload di folder assets/images untuk dihapus terlebih dahulu
				const oldImage = data.image;
				const imagePath = path.join('assets', 'images', oldImage);
				// menghapus gambar yang lama
				if (req.file.filename != oldImage) {
					fs.unlink(imagePath, async err => {
						if (err && err.code !== 'ENOENT') {
							console.error(err);
							res.status(500).json({
								message: 'Failed to update data',
							});
							return;
						}
					});
				}
				const reqId = req.params.id;
				const image = req.file.filename;
				const updatedCategory = await data.update(
					{ image: image },
					{ where: { id: reqId }, returning: true }
				);
				res.status(200).json({
					message: 'Data successfully updated',
					data: {
						name: data.image,
					},
				});
			} else {
				res.status(404).json({
					message: 'Data not found',
				});
			}
		} catch (error) {
			console.error(error);
			res.status(500).json({
				message: 'Failed to insert data',
			});
		}
	},
];

const destroyProductAsset = async (req, res) => {
	try {
		isFound = await ProductAsset.findOne({ where: { id: req.params.id } });
		if (isFound) {
			oldImage = isFound.image
			const destroy = await ProductAsset.destroy({ where: { id: req.params.id } });

			// menghapus gambar yang 
			const imagePath = path.join('assets', 'images', oldImage);
			fs.unlink(imagePath, async err => {
				if (err && err.code !== 'ENOENT') {
					console.error(err);
					res.status(500).json({
						message: 'Failed to delete image',
					});
					return;
				}
			});
			res.status(204).json({
				message: 'Data successfully deleted',
			});
		} else {
			res.status(404).json({
				message: 'Data not found',
			});
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Failed to retrieve data',
		});
	}
};

module.exports = {
	storeProductAsset,
	getProductAsset,
	updateProductAsset,
	destroyProductAsset,
};
