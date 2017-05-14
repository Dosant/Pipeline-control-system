// const {getData} = require('../server/controllers/data');
const {mapStateToData} = require('../server/services/state');
const fs = require('fs');
const path = require('path');

function getData() {

  const data = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'data', 'data1.json')).toString());
  return Promise.resolve(data);
}

getData(0, 3528, {}).then(data => {
  const {training, test} = prepareDataSet(data);
  const network = train(training);

  test.forEach((testSet) => {
    console.log(network.run(testSet))
  })
});

function prepareDataSet(data) {
  let currElIndex = 0;

  const groupedByElement = data.reduce(
    (resultSet, data) => {
      const elId = data.element._id || data.element._id;
      if (!resultSet[elId]) {
        resultSet[elId] = {
          index: currElIndex++,
          elId: elId,
          data: []
        };
      }

      resultSet[elId].data.push({
        data: [+mapStateToData(data).fuzzificatedData.isolation.state, +mapStateToData(data).fuzzificatedData.resistance.state, +mapStateToData(data).fuzzificatedData.power.state],
        state: getStateClassArray(mapStateToData(data).stateClass)
      });

      function getStateClassArray(stateClass) {
        const array = new Array(4).fill(0);
        array[(+stateClass._id) - 1] = 1
        return array;
      }

      return resultSet;
    },
    {}
  );

  const nElements = currElIndex - 1;

  const trainingSet = Object.keys(groupedByElement).map(key => {
    return groupedByElement[key];
  });

  const element = trainingSet.find(set => set.index === 0);
  // const dataSet = element.data;
  const dataSet = trainingSet.reduce((result, currentSet) => result.concat(currentSet.data), []);

  const training = dataSet.slice(0, dataSet.length - 10);
  const test = dataSet.slice(dataSet.length - 10);

  return {
    training: training.map(data => {
      return {input: data.data, output: data.state};
    }),
    test: test.map(data => {
      return {input: data.data, output: data.state};
    })
  };
}

function train(trainingSet) {
  const brain = require('brain.js');
  var myPerceptron = new brain.NeuralNetwork();

    myPerceptron.train(trainingSet, {
        errorThresh: 0.005,  // error threshold to reach
        iterations: 20000,   // maximum training iterations
        log: true,           // console.log() progress periodically
        logPeriod: 1,       // number of iterations between logging
        learningRate: 0.3    // learning rate
    });

  // var myPerceptron = new Architect.Perceptron(3, 21, 21, 4);
  // myPerceptron.trainer.train(trainingSet, {
  //   rate: 0.1,
  //   iterations: 5000,
  //   error: 0.005,
  //   shuffle: true,
  //   log: 1000,
  //   cost: Trainer.cost.CROSS_ENTROPY
  // });
  return myPerceptron;
}
