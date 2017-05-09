const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchema = new Schema({
  isolation: {type: Number, required: true},
  resistance: {type: Number, required: true},
  power: {type: Number, required: true},
  date: {type: Date, default: Date.now},
  element: {type: String, ref: 'Element'},

  state: {type: Number, required: true}
})

const DataModel = mongoose.model('Data', dataSchema);

module.exports = DataModel;