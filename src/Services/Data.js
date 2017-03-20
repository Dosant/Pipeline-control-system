import moment from 'moment';
import {mapStateToDataSet, mapStateToSystem} from './State';
import _elements from '../../data/elements.json';
import geoData from '../../data/geo.pipe.json';
import _data from '../../data/data.json';

const data = mapStateToDataSet(_data);
const elements = _elements.map(element => {
  const lastData = getLastDateForElement(element.id, 3);
  return Object.assign(element, {
    lastState: lastData[0].state,
    lastStateClass: lastData[0].stateClass,
    lastData: lastData,
  });
});

const systemState = mapStateToSystem(groupByDate(data));


export function getData(skip = 0, top = 50, filterConfig = {}) {
  return data
    .filter(item => {
      const {date, state, elements} = filterConfig;
      if (date) {
        if (item.date > date.end || item.date < date.start) {
          return false;
        }
      }

      if (state) {
        if (state.min > item.state) {
          return false;
        }
      }

      if (elements) {
        if (!elements.some(element => element.id === item.info.id)) {
          return false;
        }
      }

      return true;
    })
    .slice(skip, skip + top);
}

export function getElements() {
  return elements;
}

export function getElementById(id) {
  return elements.find(element => element.id === id);
}

export function getElementByName(name) {
  return elements.find(element => element.name === name);
}

export function getGeoData() {
  return geoData;
}

export function getLastDateForElement(id, count = 1) {
  const result = [];

  for (let i = 0; i < data.length; i++) {
    if (result.length === count) {
      break;
    }

    if (data[i].info.id === id) {
      result.push(data[i]);
    }
  }

  return result;
}


const currentState = systemState[0];
const previousStates = systemState.slice(-(systemState.length - 1));

export function getSystemState() {
  return {systemState, currentState, previousStates};
}

function groupByDate(data) {
  const perGroup = elements.length;
  const groupedResult = new Array(data.length / perGroup).fill('_').map(() => {
    return {
      data: [],
      date: null,
    };
  });

  for (let i = 0; i < data.length; i++) {
    groupedResult[Math.floor(i / perGroup)].data.push(data[i]);
  }

  groupedResult.forEach(group => {
    group.date = group.data[0].date
  });

  return groupedResult;
}
