const ISOLATION_SCALE = 1000; /* кОм */
const RESISTANCE_SCALE = 200; /* Ом */
const POWER_SCALE = 100; /* % */

function fuzzificationIsolation(input) {
  if (input <= 5) {
    return 1; /* critial */
  } else if (input > 100) {
    return 0; /* norma 3 + */
  } else {
    return Math.max(Math.min(1 - input / ISOLATION_SCALE, 0.75), 0) /
      2; /* norma 5, norma 4 */
  }
}

function fuzzificationResistance(input) {
  if (input >= 200) {
    return 1; /* critial */
  } else if (input <= 100) {
    return 0; /* norma 1 */
  } else {
    return Math.min(Math.max(input / RESISTANCE_SCALE, 0), 0.7);
  }
}

function fuzzificationPower(input) {
  input /= POWER_SCALE;
  if (input >= 0.8) {
    return 0;
  } else if (input <= 0.1) {
    return 1;
  } else {
    return (1 - input) / 2;
  }
}

module.exports = {
  fuzzificationIsolation,
  fuzzificationResistance,
  fuzzificationPower
}
