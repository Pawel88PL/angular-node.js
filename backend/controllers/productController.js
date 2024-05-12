import {
    addProductWithImages,
    deleteProductById,
    getProductsFromDb,
    getProductById,
    updateProductWithImages
} from '../services/productService.js';


export async function addProduct (req, res) {
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

export async function deleteProduct (req, res) {
    try {
        const { id } = req.params;
        await deleteProductById(id);
        res.status(200).send({ message: 'Produkt został usunięty.' });
    } catch (error) {
        console.error('Błąd podczas usuwania produktu:', error);
        res.status(500).send({ message: 'Wystąpił błąd podczas usuwania produktu.' });
    }
};

export async function getProducts (req, res) {
    try {
        const products = await getProductsFromDb();
        res.json(products);
    } catch (error) {
        console.error('Błąd podczas pobierania produktów:', error);
        res.status(500).send('Błąd podczas pobierania produktów');
    }
};

export async function getProduct (req, res) {
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

export async function updateProduct (req, res) {
    try {
        const { id } = req.params;
        const { ImagePaths, ...productData } = req.body;
        const updatedProduct = await updateProductWithImages(id, productData, ImagePaths || []);
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error('Błąd podczas aktualizacji produktu:', error);
        res.status(500).send({ message: 'Wystąpił błąd podczas aktualizacji produktu.' });
    }
};