function setupModelAssociations({ Product, Category, ProductImage }) {
    // Produkt należy do jednej Kategorii
    Product.belongsTo(Category, {
        as: 'category',
        foreignKey: 'categoryId',
    });

    // Kategoria może mieć wiele Produktów
    Category.hasMany(Product, {
        as: 'products',
        foreignKey: 'categoryId',
    });

    // Produkt może mieć wiele Obrazów
    Product.hasMany(ProductImage, {
        as: 'productImages',
        foreignKey: 'productId',
    });
}

module.exports = setupModelAssociations;
