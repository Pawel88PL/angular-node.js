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

// Pobieranie produktu na podstawie ID
router.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params; // Pobranie ID produktu z parametrów ścieżki
        const query = `
            SELECT Products.*, Categories.Name AS CategoryName
            FROM Products
            JOIN Categories ON Products.CategoryId = Categories.CategoryId
            WHERE Products.ProductId = ?
        `;
        const result = await dbService.querySql(query, [id]);
        if (result.length > 0) {
            res.json(result[0]); // Zwraca pierwszy (i jedyny) produkt w wynikach zapytania
        } else {
            res.status(404).send('Produkt nie został znaleziony.');
        }
    } catch (err) {
        console.error('Błąd podczas pobierania produktu:', err);
        res.status(500).send('Błąd serwera podczas pobierania produktu.');
    }
});

module.exports = router;