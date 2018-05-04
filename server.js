const express = require("express");
const bodyParser = require("body-parser");
const dbConfig = require('./database.config')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose.connect(dbConfig.url)

const serverConfig = {
  port: 8000
};

const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.get("/", async (req, res) => {
  await res.json({
    message: "Welcome to Dr Bluhm Website's API."
  });
});
server.listen(serverConfig.port, function() {
  console.log("Server listening on port: " + serverConfig.port);
});

module.exports = server;
