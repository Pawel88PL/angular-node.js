require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const productsController = require('./controllers/productsController');
const usersController = require('./controllers/usersController');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({origin: 'http://localhost:4200'}));
app.use(express.json());

console.log(productsController.getProducts); // Powinno wyświetlić funkcję, jeśli jest poprawnie zaimportowana
app.get('/products', productsController.getProducts);
app.get('/products/:id', productsController.getProductById);
app.post('/register', usersController.register);

const port = process.env.PORT

app.listen(port, () => {
    console.log(`API nasłuchuje na porcie: http://localhost:${port}`);
});

