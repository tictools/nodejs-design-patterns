import RecursiveEventBuilder from "./RecursiveEventBuilder.mjs";
import ValidationService from "./ValidationService.mjs";

function ticker({ thresholdInMilliseconds, callback }) {
  const validator = new ValidationService();

  const { errorMessage: erroredCallbackMessage, isValid: isValidCallback } =
    validator.validate({
      value: callback,
      key: "callback",
      type: "function",
    });

  if (!isValidCallback) {
    callback(new TypeError(erroredCallbackMessage));
  }

  const { errorMessage: erroredThresholdMessage, isValid: isValidThreshold } =
    validator.validate({
      value: thresholdInMilliseconds,
      key: "threshold in milliseconds",
      type: "number",
    });

  if (!isValidThreshold) {
    callback(new TypeError(erroredThresholdMessage));
  }

  return new RecursiveEventBuilder()
    .withThreshold(thresholdInMilliseconds)
    .withCounter(0)
    .withCallback(callback)
    .start();
}

export default ticker;
