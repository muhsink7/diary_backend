const express = require('express');
const userRouter = express.Router();

userRouter.post('/register', (req, res) => {
    res.send('Register');
});

userRouter.post('/login', (req, res) => {
    res.send('Login');
});

module.exports = userRouter;