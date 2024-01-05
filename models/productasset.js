'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class ProductAsset extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			ProductAsset.belongsTo(models.Product, {
				foreignKey: 'product_id',
				as: 'product',
				onDelete: 'cascade',
			});
		}
	}
	ProductAsset.init(
		{
			product_id: DataTypes.INTEGER,
			image: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'ProductAsset',
			tableName: 'productAssets',
		}
	);
	return ProductAsset;
};
