import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';

import cartRoutes from './routes/cartRoutes.js';
import filesRoutes from './routes/fileRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import productsRoutes from './routes/productRoutes.js';
import usersRoutes from './routes/userRouter.js';

const app = express();
const port = process.env.PORT;
const origin = process.env.ORIGIN;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({ origin: origin }));
app.use(helmet());
app.use(express.json());

app.use('/cart', cartRoutes);
app.use('/files', filesRoutes);
app.use('/products', productsRoutes);
app.use('/users', usersRoutes);
app.use('/order', orderRoutes);

app.listen(port, () => {
    console.log(`Node.js API is listening at port: http://localhost:${port} ...`);
});
