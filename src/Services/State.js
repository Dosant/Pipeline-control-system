import states from '../../data/states.json';
import {
  identifyStateOfData,
  identifyStateOfSystem,
} from './Algorithm/simple';

export function getStates() {
  return states;
}

export function mapStateToData(data) {
  const state = identifyStateOfData(data, states);
  return Object.assign(data, state);
}

export function mapStateToDataSet(dataSet) {
  return dataSet.map(data => {
    return mapStateToData(data);
  });
}

export function mapStateToSystem(stateSet) {
  return stateSet.map(state => {
    return Object.assign(state, identifyStateOfSystem(state));
  });
}
