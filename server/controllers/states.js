const State = require('../models/state');
const Action = require('../models/action');
const Notification = require('../models/notification');

module.exports = {
  addState: addState,
  getStates: getStates
};

function addState(stateData) {
  const state = new State(stateData);
  return state.save();
}

function getStates(stateData) {
  return State.find().populate('action').populate('notification').lean().exec();
}
