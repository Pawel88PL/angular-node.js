const { Sequelize } = require('sequelize');
const setupProductCategory = require('../models/modelAssociations');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    timezone: 'Europe/Warsaw',
    logging: console.log
});


const Product = require('../models/product.model')(sequelize, Sequelize.DataTypes);
const Category = require('../models/category.model')(sequelize, Sequelize.DataTypes);
const User = require('../models/user.model')(sequelize, Sequelize.DataTypes);

setupProductCategory({sequelize, Product, Category});

module.exports = { sequelize, Product, Category, User};