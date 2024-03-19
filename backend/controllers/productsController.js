const { Product, Category } = require('../config/dbConfig');

// Pobieranie wszystkich produktów
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            include: [{
                model: Category,
                as: 'category' // Alias zdefiniowany w modelu Product, w relacji do Category
            }]
        });
        res.json(products);
    } catch (error) {
        console.error('Błąd podczas pobierania produktów:', error);
        res.status(500).send('Błąd podczas pobierania produktów');
    }
};

// Pobieranie produktu na podstawie ID
exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id, {
            include: [{
                model: Category,
                as: 'category' // Alias zdefiniowany w modelu Product, w relacji do Category
            }]
        });

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
