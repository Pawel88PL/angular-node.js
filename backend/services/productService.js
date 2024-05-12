import { sequelize } from '../config/dbConfig.js';
import { Product, Category, ProductImage } from '../config/dbConfig.js';


export async function addProductWithImages(productData, imagePaths) {
    const transaction = await sequelize.transaction();
    try {
        const newProduct = await Product.create({
            categoryId: productData.categoryId,
            name: productData.name,
            price: productData.price,
            weight: productData.weight,
            amountAvailable: productData.amountAvailable,
            description: productData.description,
        }, { transaction });

        const imagesData = imagePaths.map(imagePath => ({
            productId: newProduct.productId,
            imagePath: imagePath
        }));

        await ProductImage.bulkCreate(imagesData, { transaction });
        await transaction.commit();
        return newProduct;

    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

export async function deleteProductById (id) {
    const transaction = await sequelize.transaction();

    try {
        await ProductImage.destroy({
            where: { ProductId: id },
            transaction: transaction
        });

        await Product.destroy({
            where: { ProductId: id },
            transaction: transaction
        });

        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

export async function getProductsFromDb () {
    return await Product.findAll({
        include: [
            {
                model: Category,
                as: 'category'
            }, {
                model: ProductImage,
                as: 'productImages'
            }
        ]
    });
};

export async function getProductById (id) {
    return await Product.findByPk(id, {
        include: [
            {
                model: Category,
                as: 'category'
            }, {
                model: ProductImage,
                as: 'productImages'
            }
        ]
    });
};

export async function updateProductWithImages (id, productData, imagePaths) {
    const transaction = await sequelize.transaction();
    try {
        const productToUpdate = await Product.findByPk(id, { transaction });
        if (!productToUpdate) {
            throw new Error('Produkt nie został znaleziony.');
        }

        await productToUpdate.update(productData, { transaction });

        const imagesData = imagePaths.map(imagePath => ({
            productId: id,
            imagePath: imagePath
        }));

        await ProductImage.bulkCreate(imagesData, { transaction });

        await transaction.commit();
        return productToUpdate;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};