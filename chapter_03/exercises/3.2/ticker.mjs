/**
 * TICKER
 * Write a function that accepts a number and a callback as the arguments.
 * The function will return an EventEmitter that emits an event
 * called tick every 50 milliseconds until the number of milliseconds
 * is passed from the invocation of the function.
 * The function will also call the callback when the number of milliseconds has passed,
 * providing, as the result, the total count of tick events emitted.
 * Hint: you can use setTimeout() to schedule another setTimeout() recursively.
 */

import { EventEmitter } from 'node:events'

function recursion ({ limitInMilliseconds, totalTicks, callback, emitter }) {
  const TIMEOUT = 50

  if (limitInMilliseconds <= 0) {
    emitter.emit('finish')
    return callback(null, totalTicks)
  }

  globalThis.setTimeout(() => {
    emitter.emit('tick')
    return recursion({
      limitInMilliseconds: limitInMilliseconds - TIMEOUT,
      totalTicks: totalTicks + 1,
      callback,
      emitter
    })
  }, TIMEOUT)
}

function ticker (limitInMilliseconds, callback) {
  const emitter = new EventEmitter()
  recursion({ limitInMilliseconds, totalTicks: 0, callback, emitter })
  return emitter
}

export default ticker
