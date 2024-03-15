const express = require('express');
const router = express.Router();
const dbService = require('../services/dbService');

// Pobieranie wszystkich produktów
router.get('/products', async (req, res) => {
    try {
        const result = await dbService.querySql('SELECT * FROM Products', []);
        res.json(result);
    } catch (err) {
        console.error('Błąd podczas pobierania produktów:', err);
        res.status(500).send('Błąd podczas pobierania produktów');
    }
});

module.exports = router;
