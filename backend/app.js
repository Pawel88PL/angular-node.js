require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const port = process.env.PORT
const origin = process.env.ORIGIN
const cartRoutes = require('./routes/cartRoutes');
const filesRoutes = require('./routes/filesRoutes');
const productsRoutes = require('./routes/productsRoutes');
const usersRoutes = require('./routes/usersRouter');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({origin: origin}));
app.use(helmet());
app.use(express.json());
app.use('/cart', cartRoutes);
app.use('/files', filesRoutes);
app.use('/products', productsRoutes);
app.use('/users', usersRoutes);


app.listen(port, () => {
    console.log(`Node.js API is listening at port: http://localhost:${port} ...`);
});