// implement your server here
// require your posts router and connect it here
//! 1
const express = require("express");
//! 2
const postsRouter = require("./posts/posts-router");
//! 3
const server = express();

//! 4 GLOBAL MIDDLEWARE
server.use(express.json());
server.use('/api/posts', postsRouter);

module.exports = server;