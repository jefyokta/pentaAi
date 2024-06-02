"use strict";
const express = require('express');
const gemini = require('./Controllers/Gemini');
const app = express();
app.get('/', (req, res) => {
    res.json('helloworld');
});
app.use('/gemini', gemini);
app.listen(3100, () => {
    console.log('gas');
});
