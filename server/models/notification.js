const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  _id: {type: String, required: true, unique: true},
  level: {type: Number, required: true},
  name: {type: String, required: true},
  contacts: {
    phone: [{type: String, required: true}],
    email: [{type: String, required: true}]
  }
});

const NotificationModel = mongoose.model('Notification', notificationSchema);

module.exports = NotificationModel;
