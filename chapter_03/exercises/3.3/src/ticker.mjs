import RecursiveEventBuilder from "./RecursiveEventBuilder.mjs";
import ValidationService from "./ValidationService.mjs";

function ticker({ thresholdInMilliseconds, callback }) {
  const validator = new ValidationService();

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
