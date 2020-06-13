const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth',logger, authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

function logger (req, res, next){
    console.log(`[${Date.now()}] ${req.method} at ${req.url}`);
    next();
}

module.exports = server;
