const {
  fuzzificationIsolation,
  fuzzificationPower,
  fuzzificationResistance
} = require('./helpers/fuzzification');

const {uncertainty} = require('./helpers/uncertainty');
const {filtration} = require('./helpers/filtration');
const {identify} = require('./helpers/identification');
const {getMessage} = require('./helpers/message');

function identifyStateOfData(input, states) {
  let {isolation, resistance, power} = input;
  isolation = +isolation;
  resistance = +resistance;
  power = +power;

  /*
    1. Фазификация. Привести поступившие данные к промежутку 0 - 1 (1 - плохо. 0 - хорошо)
  */
  isolation = fuzzificationIsolation(isolation);
  resistance = fuzzificationResistance(resistance);
  power = fuzzificationPower(power);
  const data = [isolation, resistance, power];

  /*
    2. Фильтрация
  */
  const filteredData = filtration(data);

  /*
    3. Оценка неопредленности
  */
  const uncertaintyEstimation = uncertainty(filteredData);

  /*
    4. Определение состояния всего элемента
  */
  const elementState = identify(filteredData);

  /*
    5. Выбор соответсвующего класса состояния и управления
  */

  function getStateClass(elementState) {
    const _elementStateClassIndex = states.findIndex(state => {
      return elementState <= state.max && elementState >= state.min;
    });

    const _elementStateClass = states[_elementStateClassIndex];

    return {
      elementStateClassIndex: _elementStateClassIndex,
      elementStateClass: _elementStateClass
    };
  }

  const {elementStateClassIndex, elementStateClass} = getStateClass(
    elementState
  );

  /*
    6. Формирования прогноза
  */
  const forecastElementClassIndex = states.length - 1 === elementStateClassIndex
    ? elementStateClassIndex
    : elementStateClassIndex + 1;

  const forecastElementClass = states[forecastElementClassIndex];

  /*
    7,8. Формирование сообщения и выбор кому отправлять сообщение
  */
  const criticalPropertyIndex = data.indexOf(elementState);
  const criticalProperty = criticalPropertyIndex === 0
    ? 'isolation'
    : criticalPropertyIndex === 1 ? 'resistance' : 'power';
  const message = getMessage(elementStateClass, criticalProperty);

  return {
    state: elementState,
    stateClass: elementStateClass,
    forecastClass: forecastElementClass,
    uncertaintyEstimation,
    message: message.message,
    shortMessage: message.shortMessage,
    criticalProperty,
    isCritical: elementStateClassIndex > 1,
    fuzzificatedData: {
      isolation: {
        state: isolation.toFixed(2),
        stateClass: getStateClass(isolation).elementStateClass
      },
      resistance: {
        state: resistance.toFixed(2),
        stateClass: getStateClass(resistance).elementStateClass
      },
      power: {
        state: power.toFixed(2),
        stateClass: getStateClass(power).elementStateClass
      }
    }
  };
}

/* Состояние системы - худшее состояние узла */
function identifyStateOfSystem(data) {
  data.sort((a, b) => b.state - a.state);
  const criticalDataArray = data.filter(
    ({stateClass}) => stateClass._id === '3' || stateClass._id === '4'
  );
  const criticalData = data[0];
  const state = criticalData.state;
  const stateClass = criticalData.stateClass;
  return {
    state,
    stateClass,
    criticalData,
    criticalDataArray
  };
}

module.exports = {
  identifyStateOfData,
  identifyStateOfSystem
}