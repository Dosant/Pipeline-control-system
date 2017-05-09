const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActionSchema = new Schema({
  _id: {type: String, required: true, unique: true},
  message: {type: String, required: true}
});

const ActionModel = mongoose.model('Action', ActionSchema);

module.exports = ActionModel;
