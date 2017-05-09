const Data = require('../models/data');
const Element = require('../models/element');
const {mapStateToDataSet} = require('../services/state');

module.exports = {
  addElement,
  getElements,
  getElementsWithState,
  getElementsStats
};

function addElement(elementData) {
  const element = new Element(elementData);
  return element.save();
}

function getElements() {
  return Element.find().lean().exec();
}

function getElementsWithState(deep = 1) {
  const dataController = require('./data'); // some issue with recursive imports O_O
  return getElements().then(elements => {
    return Promise.all(
      elements.map(element => {
        return dataController.getData(0, deep, {
          elements: [element._id]
        })
          .then(dataSet => {
            return mapStateToDataSet(dataSet);
          })
          .then(dataSet => {
            return Object.assign(element, {
              lastState: dataSet[0].state,
              lastStateClass: dataSet[0].stateClass,
              lastData: dataSet
            });
          });
      })
    );
  });
}

function getElementsStats() {
  return Data.aggregate([
      {
        $match: {
          state: {$gt: 0.5}
        }
      },
      {
        $group: {
          _id: '$element',
          count: {$sum: 1}
        }
      }
    ])
    .exec()
    .then(elements => {
      return getElements().then(elementsInfo => {
        elements.forEach(element => {
          const elementInfo = elementsInfo.find(
            ({_id}) => _id === element._id
          );
          Object.assign(element, elementInfo);
        });

        return elements;
      });
    })
}
