
const { addProductWithImages, deleteProduct, getProducts, getProductById, updateProduct } = require('../services/productsService');


exports.addProduct = async (req, res) => {
    try {
        
        const productData = req.body;
        const imagePaths = productData.ImagePaths || [];
        const product = await addProductWithImages(productData, imagePaths);

        res.status(201).json(product);
    } catch (error) {
        console.error('Wystąpił błąd podczas dodawania produktu:', error);
        res.status(500).send({ message: 'Wystąpił błąd podczas dodawania produktu.' });
    }
};

exports.deleteProductById = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteProduct(id);
        res.status(200).send({ message: 'Produkt został usunięty.' });
    } catch (error) {
        console.error('Błąd podczas usuwania produktu:', error);
        res.status(500).send({ message: 'Wystąpił błąd podczas usuwania produktu.' });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const products = await getProducts();
        res.json(products);
    } catch (error) {
        console.error('Błąd podczas pobierania produktów:', error);
        res.status(500).send('Błąd podczas pobierania produktów');
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await getProductById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).send('Produkt nie został znaleziony.');
        }
    } catch (error) {
        console.error('Błąd podczas pobierania produktu:', error);
        res.status(500).send('Błąd serwera podczas pobierania produktu.');
    }
};

exports.updateProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await updateProduct(id, req.body);
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error('Błąd podczas aktualizacji produktu:', error);
        res.status(500).send({ message: 'Wystąpił błąd podczas aktualizacji produktu.' });
    }
};