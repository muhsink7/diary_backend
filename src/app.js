const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 8080;

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true }
.then(() => console.log('Connected to MongoDB'))
.catch(error => console.error('Error connecting to MongoDB', error)));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => { console.log('Connected to MongoDB') });


app.get('/', (req, res) => {
    res.send('Hello world');
})

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
})