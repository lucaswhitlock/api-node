const restful = require("node-restful");
const mongoose = restful.mongoose;

const peopleSchema = new mongoose.Schema({
  photo: { type: String, required: true },
  name: { type: String, required: true },
  position: { type: String, required: true },
  office: { type: Number, min: 8, required: true },
  lab: { type: Number, min: 8, required: true },
  email: { type: String, required: true }
}, {
  timestamps: true
});

module.exports = restful.model('People', peopleSchema)