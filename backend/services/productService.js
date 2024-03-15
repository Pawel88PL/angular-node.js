const dbService = require('./dbService');

async function getAllProducts() {
    const query = 'SELECT * FROM Products';
    try {
        const products = await dbService.querySql(query);
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

async function getProductById(id) {
    const query = 'SELECT * FROM Products WHERE Id = @Id';
    const parameters = [{ name: 'Id', type: dbService.sql.Int, value: id }];
    try {
        const product = await dbService.querySql(query, parameters);
        return product[0] || null; // Zwróć pierwszy produkt lub null, jeśli nie znaleziono
    } catch (error) {
        console.error(`Error fetching product with id ${id}:`, error);
        throw error;
    }
}

async function addProduct(product) {
    const query = `
    INSERT INTO Products (Name, Description, Price) VALUES (@Name, @Description, @Price);
    SELECT * FROM Products WHERE Id = SCOPE_IDENTITY();
  `;
    const parameters = [
        { name: 'Name', type: dbService.sql.VarChar, value: product.name },
        { name: 'Description', type: dbService.sql.Text, value: product.description },
        { name: 'Price', type: dbService.sql.Decimal, value: product.price }
    ];
    try {
        const addedProduct = await dbService.querySql(query, parameters);
        return addedProduct[0];
    } catch (error) {
        console.error('Error adding new product:', error);
        throw error;
    }
}

async function updateProduct(id, product) {
    const query = `
    UPDATE Products SET Name = @Name, Description = @Description, Price = @Price WHERE Id = @Id;
    SELECT * FROM Products WHERE Id = @Id;
  `;
    const parameters = [
        { name: 'Id', type: dbService.sql.Int, value: id },
        { name: 'Name', type: dbService.sql.VarChar, value: product.name },
        { name: 'Description', type: dbService.sql.Text, value: product.description },
        { name: 'Price', type: dbService.sql.Decimal, value: product.price }
    ];
    try {
        const updatedProduct = await dbService.querySql(query, parameters);
        return updatedProduct[0];
    } catch (error) {
        console.error(`Error updating product with id ${id}:`, error);
        throw error;
    }
}

async function deleteProduct(id) {
    const query = 'DELETE FROM Products WHERE Id = @Id';
    const parameters = [{ name: 'Id', type: dbService.sql.Int, value: id }];
    try {
        await dbService.querySql(query, parameters);
        return { message: 'Product deleted successfully' };
    } catch (error) {
        console.error(`Error deleting product with id ${id}:`, error);
        throw error;
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
};
