const express = require("express");

const server = express();

const actionRouter = require("./data/helpers/actionRouter.js");
const projectRouter = require("./data/helpers/projectRouter.js");

server.use(express.json());

// Routers
server.use('/api/actions', actionRouter);
server.use('/api/projects', projectRouter);

server.get('/', (req, res) => {
    res.send('<h2>Get to it!</h2>');
});

module.exports = server;