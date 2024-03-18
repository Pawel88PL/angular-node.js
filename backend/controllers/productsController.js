const express = require('express');
const router = express.Router();
const dbService = require('../services/dbService');

// Pobieranie wszystkich produktów
router.get('/products', async (req, res) => {
    try {
        // Zaktualizowane zapytanie SQL, aby dołączyć nazwę kategorii do każdego produktu
        const query = `
            SELECT Products.*, Categories.Name AS CategoryName
            FROM Products
            JOIN Categories ON Products.CategoryId = Categories.CategoryId
        `;
        const result = await dbService.querySql(query, []);
        res.json(result);
    } catch (err) {
        console.error('Błąd podczas pobierania produktów:', err);
        res.status(500).send('Błąd podczas pobierania produktów');
    }
});


module.exports = router;
