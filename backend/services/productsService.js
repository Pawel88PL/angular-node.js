const { sequelize } = require('../config/dbConfig');
const { Product, Category, ProductImage } = require('../config/dbConfig');

const addProductWithImages = async (productData, imagePaths) => {
    // Rozpoczęcie transakcji
    const transaction = await sequelize.transaction();
    try {
        // Tworzenie nowego produktu
        const newProduct = await Product.create({
            // Przypisanie danych produktu
            categoryId: productData.categoryId,
            name: productData.name,
            price: productData.price,
            weight: productData.weight,
            amountAvailable: productData.amountAvailable,
            description: productData.description,
        }, { transaction });

        // Przygotowanie danych obrazów do zapisu
        const imagesData = imagePaths.map(imagePath => ({
            productId: newProduct.productId,
            imagePath: imagePath
        }));

        // Zapis obrazów do bazy danych
        await ProductImage.bulkCreate(imagesData, { transaction });

        // Zatwierdzenie transakcji
        await transaction.commit();
        return newProduct;
    } catch (error) {
        // Wycofanie transakcji w przypadku błędu
        await transaction.rollback();
        throw error;
    }
};

const deleteProduct = async (id) => {
    const transaction = await sequelize.transaction();

    try {
        // Najpierw usuń wszystkie powiązane obrazy produktu
        await ProductImage.destroy({
            where: { ProductId: id },
            transaction: transaction
        });

        // Następnie usuń produkt
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

const getProducts = async () => {
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

const getProductById = async (id) => {
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

const updateProductWithImages = async (id, productData, imagePaths) => {
    const transaction = await sequelize.transaction();
    try {
        // Wyszukanie produktu do zaktualizowania
        const productToUpdate = await Product.findByPk(id, { transaction });
        if (!productToUpdate) {
            throw new Error('Produkt nie został znaleziony.');
        }

        // Aktualizacja produktu z danymi z formularza
        await productToUpdate.update(productData, { transaction });

        // Przygotowanie danych nowych obrazów do zapisu
        const imagesData = imagePaths.map(imagePath => ({
            productId: id,
            imagePath: imagePath
        }));

        // Dodanie nowych obrazów do bazy danych
        await ProductImage.bulkCreate(imagesData, { transaction });

        // Zatwierdzenie transakcji
        await transaction.commit();
        return productToUpdate;
    } catch (error) {
        // Wycofanie transakcji w przypadku błędu
        await transaction.rollback();
        throw error;
    }
};

module.exports = {
    addProductWithImages,
    deleteProduct,
    getProducts,
    getProductById,
    updateProductWithImages
};