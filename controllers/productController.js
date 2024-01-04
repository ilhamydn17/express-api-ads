const Product = require('../models').Product;
const ProductAsset = require('../models').ProductAsset;
const Category = require('../models').Category;
const productValidator = require('../controllers/validators/productValidator');
const { sequelize } = require('../models'); 
let slug = require('slug');

// const syncDatabase = async () => {
// 	try {
// 	  await sequelize.sync({ alter: true });
// 	  console.log('Database synchronized successfully.');
// 	} catch (error) {
// 	  console.error('Error synchronizing database:', error);
// 	} finally {
// 	  process.exit(); // Keluar dari proses setelah selesai
// 	}
//   };
  
//   syncDatabase(); 

const storeProduct = [
	productValidator.validateStoreProduct,
	async (req, res) => {
		try {
			cleanName = req.body.name.replace(/[.\-\/]/g, ' ');
			sluggedName = slug(cleanName);
			const data = await Product.create({
				category_id: req.body.category_id,
				name: req.body.name,
				slug: sluggedName,
				price: req.body.price,
			});
			res.status(201).json({
				message: 'Data successfully created',
				data: {
					name: data.name,
					price: data.price,
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

const getProduct = async (req, res) => {
	try {
		const getDatas = await Product.findAll({
			attributes: ['category_id','name', 'slug', 'price'],
			include: [
				{ model: Category, as: 'category', attributes: ['name'] },
				{ model: ProductAsset, as: 'productAssets', attributes: ['product_id', 'image'] },
			],
			order: [['price', req.params.byPrice]]
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

const updateProduct = [
	productValidator.validateUpdateProduct,
	async (req, res) => {
		try {
			data = await Product.findOne({ where: { id: req.params.id } });
			if (data) {
				const reqId = req.params.id;
				const reqName = req.body.name || data.name;
				const reqPrice = req.body.price || data.price;

				cleanName = reqName.replace(/[.\-\/]/g, ' ');
				sluggedName = slug(cleanName);

				const updatedProduct = await data.update(
					{ name: reqName, slug: sluggedName, price: reqPrice },
					{ where: { id: reqId }, returning: true }
                );
                
				res.status(200).json({
					message: 'Data successfully updated',
					data: {
						name: data.name,
						price: data.price,
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

const destroyProduct = async (req, res) => {
		try {
			const isDelete = await Product.destroy({ where: { id: req.params.id } });
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
	}

module.exports = {
	storeProduct,
	getProduct,
    updateProduct,
    destroyProduct
};
