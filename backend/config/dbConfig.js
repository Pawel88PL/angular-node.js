const { Sequelize } = require('sequelize');
const setupModelAssociations = require('../models/modelAssociations');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    timezone: '+01:00',
    logging: console.log
});

sequelize.authenticate()
    .then(() => {
        console.log('Connection to database has been established successfully.');
    })
    .catch(err => {
        console.error('Cannot conect to database: ', err);
        process.exit(1);
    });

const Product = require('../models/product.model')(sequelize, Sequelize.DataTypes);
const Category = require('../models/category.model')(sequelize, Sequelize.DataTypes);
const ProductImage = require('../models/productImage.model')(sequelize, Sequelize.DataTypes);
const User = require('../models/user.model')(sequelize, Sequelize.DataTypes);
const Cart = require('../models/cart.model')(sequelize, Sequelize.DataTypes);
const CartItem = require('../models/cartItem.model')(sequelize, Sequelize.DataTypes);
const Order = require('../models/order.model')(sequelize, Sequelize.DataTypes);
const OrderDetail = require('../models/orderDetail.model')(sequelize, Sequelize.DataTypes);

setupModelAssociations({ Product, Category, ProductImage, User, Cart, CartItem, Order, OrderDetail});

module.exports = { sequelize, Product, Category, ProductImage, User, Cart, CartItem, Order, OrderDetail};