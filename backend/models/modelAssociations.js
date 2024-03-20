function setupProductCategory({ Product, Category }) {
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
}

module.exports = setupProductCategory;
