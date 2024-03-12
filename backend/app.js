require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT

app.get('/', (req, res) => {
    console.log(req);
    res.send('API działa!');
});

app.listen(port, () => {
    console.log(`API nasłuchuje na porcie: http://localhost:${port}`);
});
