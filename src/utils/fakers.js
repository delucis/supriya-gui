// fakers.js
// utilities for generating fake data to test state and UI changes

let fakers = {}

/**
 * Get a random value within upper and lower bounds.
 * Using its defaults, randomInRange() is effectively an alias for Math.random()
 *
 * @param {Object} opts - options object
 * @param {Number} [opts.min=0] - set lower bound of range
 * @param {Number} [opts.max=1] - set upper bound of range
 * @param {Boolean} [opts.int=false] - toggle integer output on/off
 *
 * @returns {Number} A random number between opts.min and opts.max. If opts.int is true, will be an integer.
 */
fakers.randomInRange = function ({min = 0, max = 1, int = false} = {}) {
  if (min > max) {
    console.warn('randomInRange(): minimum (' + min + ') greater than maximum (' + max + '), inverting values.');
    [min, max] = [max, min]
  }
  let range = max - min
  let random = Math.random()
  let randomInRange = range * random + min
  return int ? Math.round(randomInRange) : randomInRange
}

/**
 * Randomly increment/decrement a given value by no more than a given step size.
 *
 * @param {Number} [oldVal=0] - given value to be altered
 * @param {Object} opts - options object
 * @param {Number} [opts.maxStep=1] - maximum deviation from oldVal permitted
 * @param {Boolean} [opts.int=false] - restrict steps to whole numbers, but does not round oldVal input
 *
 * @returns {Number} oldVal plus/minus a random step no larger than opts.maxStep.
 */
fakers.randomStep = function (oldVal = 0, {maxStep = 1, int = false} = {}) {
  let step = fakers.randomInRange({min: maxStep * -1, max: maxStep, int: int})
  let newVal = oldVal + step
  return newVal
}

/**
 * Randomly increment/decrement a given value without exceeding upper and lower bounds.
 *
 * @param {Number} [oldVal=0] - given value to be altered
 * @param {Object} opts - options object
 * @param {Number} [opts.min=0] - set lower bound of range
 * @param {Number} [opts.max=1] - set upper bound of range
 * @param {Number} [opts.maxStep=1] - maximum deviation from oldVal permitted
 * @param {Boolean} [opts.int=false] - restrict steps to whole numbers, but does not round oldVal input
 *
 * @returns {Number} oldVal plus/minus a random step, limited between opts.min and opts.max. 
 */
fakers.wanderInRange = function (oldVal = 0, {min = 0, max = 1, maxStep = 1, int = false} = {}) {
  if (min > max) {
    console.warn('wanderInRange(): minimum (' + min + ') greater than maximum (' + max + '), inverting values.');
    [min, max] = [max, min]
  }
  let newVal = fakers.randomStep(oldVal, {maxStep: maxStep, int: int})
  if (newVal > max) {
    return max
  } else if (newVal < min) {
    return min
  } else {
    return newVal
  }
}

/**
 * Fake some audio signal values (0.–1.). Intended to be called repeatedly over time.
 *
 * @param {Number} [f=65] - Frequency used to drive “audio” algorithm
 *
 * @returns {Number} A number between 0 and 1, generated using audio-like calculations.
 */
fakers.fauxdio = function (f = 65) {
  let now = Date.now()
  let nowR = now / 1000 * Math.PI / 2
  // cyclic components (sine waves of various frequencies)
  let lowwave  = Math.sin(nowR * f * 0.076)
  let basewave = Math.sin(nowR * f * 1    ) * 0.8
  let midwave  = Math.sin(nowR * f * 5.73 ) * 0.6
  let highwave = Math.sin(nowR * f * 17   ) * 0.4
  // noise components
  let lownoise = (Math.random() * 2 - 1) * 0.1
  let peaks = Math.pow((Math.random() * 2 - 1), 4)
  let fauxdio = Math.abs((lowwave + basewave + midwave + highwave + lownoise + peaks) / 3)
  return fauxdio
}

export default fakers
