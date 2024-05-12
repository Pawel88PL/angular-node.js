import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';
import setupModelAssociations from '../models/modelAssociations.js';

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
        console.error('Cannot connect to database: ', err);
        process.exit(1);
    });

import ProductModel from '../models/product.model.js';
import CategoryModel from '../models/category.model.js';
import ProductImageModel from '../models/productImage.model.js';
import UserModel from '../models/user.model.js';
import CartModel from '../models/cart.model.js';
import CartItemModel from '../models/cartItem.model.js';
import OrderModel from '../models/order.model.js';
import OrderDetailModel from '../models/orderDetail.model.js';

const Product = ProductModel(sequelize, Sequelize.DataTypes);
const Category = CategoryModel(sequelize, Sequelize.DataTypes);
const ProductImage = ProductImageModel(sequelize, Sequelize.DataTypes);
const User = UserModel(sequelize, Sequelize.DataTypes);
const Cart = CartModel(sequelize, Sequelize.DataTypes);
const CartItem = CartItemModel(sequelize, Sequelize.DataTypes);
const Order = OrderModel(sequelize, Sequelize.DataTypes);
const OrderDetail = OrderDetailModel(sequelize, Sequelize.DataTypes);

setupModelAssociations({ Product, Category, ProductImage, User, Cart, CartItem, Order, OrderDetail });

export { sequelize, Product, Category, ProductImage, User, Cart, CartItem, Order, OrderDetail };
