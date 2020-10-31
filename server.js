const express = require('express');

//const RecipeRouter = require('./recipes/recipes-router.js');

const server = express();

server.use(express.json());
server.use('/api/schemes', SchemeRouter);

module.exports = server;