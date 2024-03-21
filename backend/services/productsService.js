const { Product, Category } = require('../config/dbConfig');

const createProduct = async (productData) => {
    const product = await Product.create(productData);
    return product;
};

const deleteProduct = async (id) => {
    const productToDelete = await Product.findByPk(id);
    if (!productToDelete) {
        throw new Error('Produkt nie został znaleziony.');
    }
    await productToDelete.destroy();
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
    deleteProduct,
    getProducts,
    getProductById,
};