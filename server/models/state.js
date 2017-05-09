const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stateSchema = new Schema({
  _id: {type: String, required: true, unique: true},
  name: {type: String, required: true},
  adj: {type: String, required: true},
  color: {type: String, required: true},
  icon: {type: String, required: true},

  max: {type: Number, required: true},
  min: {type: Number, required: true},

  date: {type: Date, default: Date.now},
  notification: [{type: String, ref: 'Notification'}],
  action: {type: String, ref: 'Action'}
});

const StateModel = mongoose.model('State', stateSchema);

module.exports = StateModel;
