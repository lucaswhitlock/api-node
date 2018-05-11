const express = require("express");
const bodyParser = require("body-parser");
const dbConfig = require('./database.config')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

console.log("Connecting to database...")
mongoose.connect(dbConfig.url_local).then(() => {
    console.log("Connected to database")
}).catch(err => {
    console.log("Could not connect to the database.")
    process.exit()
})

const PORT = process.env.PORT || 8000;

const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.get("/", (req, res) => {
  res.json({
    message: "Welcome to Dr Bluhm Website's API."
  });
});

require('./app/routes/people-route')(server)
require('./app/routes/contacts-route')(server)
require('./app/routes/posts-route')(server)
require('./app/routes/projects-route')(server)
server.listen(PORT);

module.exports = server;
