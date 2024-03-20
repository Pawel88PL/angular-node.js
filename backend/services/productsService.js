const { Product, Category } = require('../config/dbConfig');

const createProduct = async (productData) => {
    const product = await Product.create(productData);
    return product;
};

const getProducts = async () => {
    return await Product.findAll({
        include: [{
            model: Category,
            as: 'category'
        }]
    });
};

const getProductById = async (id) => {
    return await Product.findByPk(id, {
        include: [{
            model: Category,
            as: 'category'
        }]
    });
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
};