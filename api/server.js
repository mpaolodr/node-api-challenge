// IMPORTS
const express = require("express");

const server = express();

// BUILT-IN MIDDLEWARE
server.use(express.json());

// ROUTERS

// CUSTOM MIDDLEWARE

server.get("/", (req, res) => {
  res.status(200).json({ api: "is live" });
});

module.exports = server;
