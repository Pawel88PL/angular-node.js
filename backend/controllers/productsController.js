const { createProduct, getProducts, getProductById } = require('../services/productsService');

exports.addProduct = async (req, res) => {
    try {
        const productData = req.body;
        const product = await createProduct(productData);
        res.status(201).json(product);
    } catch (error) {
        console.error('Wystąpił błąd podczas dodawania produktu:', error);
        res.status(500).send({ message: 'Wystąpił błąd podczas dodawania produktu.' });
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