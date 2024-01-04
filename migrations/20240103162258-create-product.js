'use strict';
/** @type {import('sequelize-cli').Migration} */
const { sequelize } = require('../models');
const { QueryInterface } = require('sequelize');

const isMigration = process.env.NODE_ENV === 'migration';

const syncDatabase = async () => {
	try {
		await sequelize.sync({ alter: true });
		console.log('Database synchronized successfully.');
	} catch (error) {
		console.error('Error synchronizing database:', error);
	} finally {
		process.exit(); // Keluar dari proses setelah selesai
	}
};

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('products', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			category_id: {
				type: Sequelize.INTEGER,
				references: {
					model: 'categories',
					key: 'id',
				},
				onDelete: 'CASCADE',
			},
			name: {
				type: Sequelize.STRING(200),
			},
			slug: {
				type: Sequelize.STRING(300),
			},
			price: {
				type: Sequelize.INTEGER,
			},
			createdAt: {
				allowNull: true,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: true,
				type: Sequelize.DATE,
			},
		});

    if (isMigration) {
      // Jika sedang dalam proses migrasi, jalankan syncDatabase()
      await syncDatabase();
    }

	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('products');
	},
};
