/* eslint-disable valid-typeof */
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

  emitEventWithMessage({ event, message }) {
    this.emit(event, message);
  }

  formatTickEventCounter() {
    return `${this.ticksCounter} ${this.ticksCounter !== 1 ? "ticks" : "tick"}`;
  }

  recurse() {
    if (this.thresholdInMilliseconds <= 0) {
      this.callback(null, this.ticksCounter);
      return this.emit("end");
    }

    globalThis.setTimeout(() => {
      this.emitEventWithMessage({
        event: "tick",
        message: this.formatTickEventCounter(),
      });
      this.ticksCounter++;
      this.thresholdInMilliseconds -= this.TIMEOUT_IN_MILLISECONDS;

      this.recurse();
    }, this.TIMEOUT_IN_MILLISECONDS);
  }

  start() {
    process.nextTick(() =>
      this.emitEventWithMessage({ event: "tick", message: "INITIAL TICK" })
    );
    this.recurse();
    return this;
  }
}

class ValidatorService {
  VALID_TYPES = [
    "string",
    "number",
    "boolean",
    "undefined",
    "object",
    "function",
    "symbol",
    "bigint",
  ];

  validateType(type) {
    return this.VALID_TYPES.includes(type);
  }

  validateValue({ value, type }) {
    return !!value && typeof value === type;
  }

  validate({ value, key, type }) {
    const errorMessage = null;
    const isValid = true;

    const isValidType = this.validateType(type);

    if (!isValidType) {
      return {
        errorMessage: `Invalid type "${type}" provided for validation.`,
        isValid: false,
      };
    }

    const isValidValue = this.validateValue({ value, type });

    if (!isValidValue) {
      return {
        errorMessage: `${key} must be a ${type}, but received ${typeof value}`,
        isValid: false,
      };
    }

    return { errorMessage, isValid };
  }
}

function ticker({ thresholdInMilliseconds, callback }) {
  const validator = new ValidatorService();

  const { errorMessage: erroredThresholdMessage, isValid: isValidThreshold } =
    validator.validate({
      value: thresholdInMilliseconds,
      key: "threshold in milliseconds",
      type: "number",
    });

  if (!isValidThreshold) {
    throw new TypeError(erroredThresholdMessage);
  }

  const { errorMessage: erroredCallbackMessage, isValid: isValidCallback } =
    validator.validate({
      value: callback,
      key: "callback",
      type: "function",
    });

  if (!isValidCallback) {
    throw new TypeError(erroredCallbackMessage);
  }

  return new RecursiveEventBuilder()
    .withThreshold(thresholdInMilliseconds)
    .withCounter(0)
    .withCallback(callback)
    .start();
}

export default ticker;
