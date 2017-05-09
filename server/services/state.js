const {getStates: getStatesFromDatabase} = require('../controllers/states');
let states = null;

const {
  identifyStateOfData,
  identifyStateOfSystem
} = require ('./algorithm/simple');

function preloadStates() {
  return getStatesFromDatabase()
      .then((_states) => {
        console.log('Preload States: ', _states);
        states = _states;
        return states;
      });
}

function getStates() {
  if (states) {
    return states;
  } else {
    throw new Error('getStates: trying to access not preloaded states');
  }
}

function mapStateToData(data) {
  const states = getStates();
  const state = identifyStateOfData(data, states);
  return Object.assign(data, state);
}

function mapStateToDataSet(dataSet) {
  return dataSet.map(data => {
    return mapStateToData(data);
  });
}

function mapStateToSystem(stateSet) {
  return stateSet.map(state => {
    return Object.assign(state, identifyStateOfSystem(state));
  });
}

module.exports = {
  preloadStates,
  getStates,
  mapStateToData,
  mapStateToDataSet,
  mapStateToSystem,
  identifyStateOfSystem
}