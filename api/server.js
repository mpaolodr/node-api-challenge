// IMPORTS
const express = require("express");

// routers
const projRouter = require("../routers/projectsRouter.js");

const server = express();

// BUILT-IN MIDDLEWARE
server.use(express.json());

// ROUTERS
server.use("/api/projects", projRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "is live" });
});

module.exports = server;
