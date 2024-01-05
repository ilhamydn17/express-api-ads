'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Product extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Product.belongsTo(models.Category, {
				foreignKey: 'category_id',
				targetKey: 'id',
				as: 'category',
			});

			Product.hasMany(models.ProductAsset, {
				foreignKey: 'product_id',
				as: 'productAssets',
				onDelete: 'cascade',
			});
		}
	}
	Product.init(
		{
			category_id: DataTypes.INTEGER,
			name: DataTypes.STRING,
			slug: DataTypes.STRING,
			price: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'Product',
		}
	);
	return Product;
};
