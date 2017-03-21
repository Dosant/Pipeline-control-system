import {
  fuzzificationIsolation,
  fuzzificationPower,
  fuzzificationResistance,
} from './helpers/fuzzification';

import {uncertainty} from './helpers/uncertainty';
import {filtration} from './helpers/filtration';
import {identify} from './helpers/identification';
import {getMessage} from './helpers/message';

/*
  {"data":{"isolation":"4.35","resistance":"99.61","power":"22.46"},"info":{"id":"1aq5me","name":"element_5","geo":{"latitude":42.04461012118509,"longitude":61.013697393738425}},"date":1489856012735}
*/
export function identifyStateOfData(input, states) {
  let {isolation, resistance, power} = input.data;
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

    return {elementStateClassIndex: _elementStateClassIndex, elementStateClass: _elementStateClass};
  }

  const {elementStateClassIndex, elementStateClass} = getStateClass(elementState);

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
    },
  };
}

/* Состояние системы - худшее состояние узла */
export function identifyStateOfSystem(data) {
  data.data.sort((a, b) => b.state - a.state);
  const criticalDataArray = data.data.filter(
    ({stateClass}) => stateClass.id === '3' || stateClass.id === '4',
  );
  const criticalData = data.data[0];
  const state = criticalData.state;
  const stateClass = criticalData.stateClass;
  return {
    state,
    stateClass,
    criticalData,
    criticalDataArray,
  };
}
