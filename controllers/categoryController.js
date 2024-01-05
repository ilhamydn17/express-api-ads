const Category = require('../models').Category;
const { validationResult } = require('express-validator');
const categoryValidator = require('./validators/categoryValidator');

const storeCategory = [
	categoryValidator.validateStoreCategory,
	async (req, res) => {
		try {
			const data = await Category.create({
				name: req.body.name,
			});
			res.status(201).json({
				message: 'Data successfully created',
				data: {
					name: data.name,
				},
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({
				message: 'Failed to insert data',
			});
		}
	},
];

const getCategories = async (req, res) => {
	try {
		const getDatas = await Category.findAll();
		if (getDatas) {
			const data = getDatas.map(item => ({ name: item.name }));
			res.status(200).json({
				message: 'Data successfully retrieved',
				data: data,
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

const updateCategory = [
	categoryValidator.validateUpdateCategory,
	async (req, res) => {
		try {
			data = await Category.findOne({ where: { id: req.params.id } });
			if (data) {
				const reqId = req.params.id;
				const reqName = req.body.name;
				const updatedCategory = await data.update(
					{ name: reqName, },
					{ where: { id: reqId }, returning: true }
				);
				res.status(200).json({
					message: 'Data successfully updated',
					data: {
						name: data.name,
					},
				})
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
	},
];

const destroyCategory = [
	categoryValidator.validateDestroyCategory,
	async (req, res) => {
		try {
			const isDelete = await Category.destroy({ where: { id: req.params.id }, cascade: true });
			if (isDelete) {
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
	},
];

module.exports = {
	storeCategory,
	getCategories,
	updateCategory,
	destroyCategory,
};
