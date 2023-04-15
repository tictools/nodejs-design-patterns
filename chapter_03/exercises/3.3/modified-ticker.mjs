/**
 * TICKER
 * Modify the function created in exercise 3.2 
 * so that it emits a tick event immediately after the function is invoked.
 */

import { EventEmitter } from 'node:events'

function recursion ({ limitInMilliseconds, totalTicks, callback, emitter }) {
  const TIMEOUT = 50
  
  if (limitInMilliseconds <= 0) {
    emitter.emit('finish')
    return callback(null, totalTicks)
  }
  
  process.nextTick(() => emitter.emit('tick'))
  
  globalThis.setTimeout(() => {
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
