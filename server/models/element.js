const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const elementSchema = new Schema({
  _id: {type: String, required: true, unique: true},
  name: {type: String, required: true},
  geo: {
    latitude: {type: Number, required: true},
    longitude: {type: Number, required: true}
  }
})

const ElementModel = mongoose.model('Element', elementSchema);

module.exports = ElementModel;