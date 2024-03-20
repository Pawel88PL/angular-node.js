const { Product, Category } = require('../config/dbConfig');

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
    getProducts,
    getProductById,
};