import { EventEmitter } from "node:events";

class RecursiveEventBuilder extends EventEmitter {
  TIMEOUT_IN_MILLISECONDS = 50;

  constructor() {
    super();
    this.thresholdInMilliseconds = 0;
    this.ticksCounter = 0;
    this.callback = null;
  }

  withThreshold(thresholdInMilliseconds) {
    this.thresholdInMilliseconds = thresholdInMilliseconds;
    return this;
  }

  withCounter(ticksCounter) {
    this.ticksCounter = ticksCounter;
    return this;
  }

  withCallback(callback) {
    this.callback = callback;
    return this;
  }

  recurse() {
    if (this.thresholdInMilliseconds <= 0) {
      this.callback(null, this.ticksCounter);
      return this.emit("end");
    }

    globalThis.setTimeout(() => {
      this.emit("tick", `${Date.now()} ms`);
      this.ticksCounter++;
      this.thresholdInMilliseconds -= this.TIMEOUT_IN_MILLISECONDS;

      this.recurse();
    }, this.TIMEOUT_IN_MILLISECONDS);
  }

  start() {
    // this.emit("tick", "INITIAL STEP"); // it does not work
    process.nextTick(() => this.emit("tick", "INITIAL STEP"));
    this.recurse();
    return this;
  }
}

function ticker({ thresholdInMilliseconds, callback }) {
  if (!thresholdInMilliseconds || !callback) {
    throw new TypeError("thresholdInMilliseconds && callback must be provided");
  }

  return new RecursiveEventBuilder()
    .withThreshold(thresholdInMilliseconds)
    .withCounter(0)
    .withCallback(callback)
    .start();
}

export default ticker;
