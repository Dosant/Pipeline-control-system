const Data = require('../models/data');
const {getElements} = require('./elements');
const {mapStateToDataSet, mapStateToData, identifyStateOfSystem} = require(
  '../services/state'
);
const {pQueue} = require('../utils');
const moment = require('moment');

module.exports = {
  addData,
  addMultipleData,
  getData,
  recalcState,
  getSystemState,
  countData
};

function addMultipleData(dataSet) {
  return pQueue(dataSet.map((data) => () => addData(data)));
}

function addData(dataDoc) {
  const data = new Data(dataDoc);
  return data.save();
}

function getData(skip, top, filterConfig = {}) {
  const filterQuery = {};

  if (filterConfig.elements) {
    filterQuery.element = {$in: filterConfig.elements};
  }

  if (filterConfig.date) {
    filterQuery.date = {
      $gt: filterConfig.date.start,
      $lt: filterConfig.date.end
    };
  }

  if (filterConfig.state) {
    filterQuery.state = {$gt: filterConfig.state};
  }

  return Data.find(filterQuery)
    .sort({date: -1})
    .skip(skip)
    .limit(top)
    .populate('element')
    .lean()
    .exec();
}

function countData() {
  return Data.count();
}

function recalcState() {
  console.log('recalcState()');
  return Data.count()
    .then(count => {
      console.log('data count: ', count);
      return getData(0, count);
    })
    .then(dataSet => {
      return pQueue(
        dataSet.map(data => () => {
          const {state} = mapStateToData(data);
          return Data.findByIdAndUpdate(data._id, {state});
        })
      );
    });
}

function getSystemState(isCritical = false, top = 5, skip = 0) {
  if (!isCritical) {
    return getDataForState(top, skip);
  } else {
    return getCriticalData(top, skip);
  }
}

function getCriticalData(top = 5, skip = 0) {
  let result = [];
  const _getData = (_top, _skip) => {
    return getDataForState(_top, _skip)
      .then(states => {
        return states.filter(
          state => state.stateClass._id === '3' || state.stateClass._id === '4'
        );
      })
      .then(states => {
        result = result.concat(states);
        if (result.length < top) {
          return _getData(top, _skip + top);
        } else {
          return {
            result,
            skip: _skip
          };
        }
      });
  };

  return _getData(top, skip);
}

function getDataForState(top, skip) {
  return Data.aggregate([
      {$sort: {date: -1}},
      {
        $group: {
          _id: '$element',
          data: {$push: '$$ROOT'}
        }
      },
      {
        $project: {
          data: {$slice: ['$data', skip, top]}
        }
      }
    ])
    .exec()
    .then(elements => {
      return getElements().then(elementsInfo => {
        return {elements, elementsInfo};
      });
    })
    .then(({elements, elementsInfo}) => {
      const dataSet = elements.map(element => element.data);
      return new Array(elements[0].data.length).fill('_').map((_, index) => {
        const currentDataSet = mapStateToDataSet(
          dataSet.map(data => data[index])
        );

        const tsFrom = currentDataSet.reduce(
          (prev, {date: current}) => {
            return moment(prev) - moment(current) < 0 ? prev : current;
          },
          new Date()
        );

        const tsTo = currentDataSet.reduce(
          (prev, {date: current}) => {
            return moment(prev) - moment(current) > 0 ? prev : current;
          },
          new Date(0)
        );

        const systemState = Object.assign(
          identifyStateOfSystem(currentDataSet.map(mapStateToData)),
          {
            currentDataSet: currentDataSet,
            date: {
              from: tsFrom,
              to: tsTo
            }
          }
        );

        systemState.currentDataSet.forEach(data => {
          data.element = elementsInfo.find(
            ({_id}) => _id === data.element
          );
        });

        return systemState;
      });
    });
}

