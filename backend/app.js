require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const productsController = require('./controllers/productsController');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({origin: 'http://localhost:4200'}));
app.use(express.json());
app.use('/api', productsController);

const port = process.env.PORT

app.listen(port, () => {
    console.log(`API nasłuchuje na porcie: http://localhost:${port}`);
});
