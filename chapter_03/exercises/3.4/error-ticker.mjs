/**
 * PLAYING WITH ERRORS
 * Modify the function created in exercise 3.3 so that it produces an error
 * if the timestamp at the moment of a tick is divisible by 5.
 * (including the initial one that we added as part of exercise 3.3)
 * Propagate the error using both the callback and the event emitter.
 * Hint: use Date.now() to get the timestamp and the remainder (%) operator
 * to check whether the timestamp is divisible by 5.
 */

import { EventEmitter } from "node:events";
import timestampIsDivisibleBy from "../../utils/timestampDivisibleBy.mjs";

function recursion({ limitInMilliseconds, totalTicks, callback, emitter }) {
  const TIMEOUT = 50;
  const DivisibleBy5Error = new Error("timestamp is divisible by 5");

  if (limitInMilliseconds <= 0) {
    emitter.emit("finish");
    return callback(null, totalTicks);
  }

  if (timestampIsDivisibleBy(5)) {
    process.nextTick(() => emitter.emit("error", DivisibleBy5Error));
    return callback(DivisibleBy5Error, totalTicks);
  }

  globalThis.setTimeout(() => {
    emitter.emit("tick");
    return recursion({
      limitInMilliseconds: limitInMilliseconds - TIMEOUT,
      totalTicks: totalTicks + 1,
      callback,
      emitter,
    });
  }, TIMEOUT);
}

function ticker(limitInMilliseconds, callback) {
  const emitter = new EventEmitter();
  recursion({ limitInMilliseconds, totalTicks: 0, callback, emitter });
  return emitter;
}

export default ticker;
