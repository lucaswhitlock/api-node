const express = require("express");
const bodyParser = require("body-parser");
const dbConfig = require('./database.config')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

console.log("Connecting to database...")
mongoose.connect(dbConfig.url_remote).then(() => {
    console.log("Connected to database")
}).catch(err => {
    console.log("Could not connect to the database.")
})

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
server.listen(serverConfig.port);

module.exports = server;
