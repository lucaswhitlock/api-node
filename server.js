const express = require("express");
const bodyParser = require("body-parser");
const dbConfig = require('./database.config')
const mongoose = require('mongoose')
const cors = require('cors')
const Monitor = require('./app/controller/monitor-controller')
const Pai = require('./app/controller/pai-controller')

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

server.use(bodyParser.urlencoded({
  extended: true
}));
server.use(bodyParser.json());
server.use(cors())

server.get("/", (req, res) => {
  res.json({
    message: "Welcome to CMCG API."
  });
});

require('./app/routes/fo-route')(server)
require('./app/routes/tipo-fo-route')(server)
require('./app/routes/aluno-route')(server)
require('./app/routes/monitor-route')(server)
require('./app/routes/juiz-route')(server)
require('./app/routes/pai-route')(server)
require('./app/routes/atenuante-route')(server)
require('./app/routes/agravante-route')(server)
server.listen(PORT);

module.exports = server;