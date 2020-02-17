// IMPORTS
const express = require("express");
const cors = require("cors");

// routers
const projRouter = require("../routers/projectsRouter.js");
const actRouter = require("../routers/actionsRouter.js");

const server = express();

// BUILT-IN MIDDLEWARE
server.use(express.json());

// THIRD_PARTY MIDDLEWARE
server.use(cors());

// ROUTERS
server.use("/api/projects", projRouter);
server.use("/api/actions", actRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "is live" });
});

module.exports = server;
