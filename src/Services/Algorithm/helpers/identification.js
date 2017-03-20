/* Playing around with neural networks */

// const synaptic = require('synaptic');
// const Neuron = synaptic.Neuron,
//   Layer = synaptic.Layer,
//   Network = synaptic.Network,
//   Trainer = synaptic.Trainer,
//   Architect = synaptic.Architect;

// const trainingSet = [
//   {
//     input: [0,0,0],
//     output: [0]
//   },
//   {
//     input: [1,1,1],
//     output: [1]
//   },
//   {
//     input: [1,1,0],
//     output: [0]
//   },
//   {
//     input: [1,0,1],
//     output: [0]
//   },
//   {
//     input: [0,1,1],
//     output: [0]
//   },
//   {
//     input: [1,0,0],
//     output: [0]
//   },
//   {
//     input: [0,0,1],
//     output: [0]
//   },
//   {
//     input: [0,1,0],
//     output: [0]
//   }
// ];

function generateTrainingSetForMax(inputSize = 3, setSize = 100) {
  const set = new Array(setSize).fill('_');
  return set.map(trainingItem => {
    const input = new Array(inputSize).fill('_').map(() => Math.random());
    const output = [Math.min.apply(null, input)];
    return {
      input,
      output,
    };
  });
}

// const trainingSet = generateTrainingSetForMax();
// console.log(trainingSet);

// const trainingOptions = {
//   rate: 0.1,
//   iterations: 50000,
//   error: 0.001,
//   shuffle: true,
//   log: 5000,
// };

// const myNet = new Architect.Perceptron(3, 54, 1);
// myNet.trainer.train(trainingSet, trainingOptions);
// console.log('Finish');
// console.log('Test:');
// const test = myNet.activate([.7, .6, .3]);
// console.log('Result: ', test, 'Expected: ', .3);

// var input = 3;
// var pool = 20;
// var output = 1;
// var connections = 30;
// var gates = 10;
// var myLiquidStateMachine = new Architect.Liquid(input, pool, output, connections, gates);
// myLiquidStateMachine.trainer.train(trainingSet, trainingOptions);
// console.log('Finish');
// console.log('Test:');
// const test = myLiquidStateMachine.activate([.7, .6, .2]);
// console.log('Result: ', test, 'Expected: ', .3);

export function identify(dataSet) {
  return dataSet.reduce(
    (state, data) => {
      return Math.max(state, data);
    },
    0
  );
}
