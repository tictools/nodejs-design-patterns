/* eslint-disable valid-typeof */
export default class ValidatorService {
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
    let errorMessage = null;
    let isValid = true;

    const isValidType = this.validateType(type);

    if (!isValidType) {
      errorMessage = `Invalid type "${type}". Valid types: ${this.VALID_TYPES.join(
        " | "
      )}`;
      isValid = false;
    }

    const isValidValue = this.validateValue({ value, type });

    if (!isValidValue) {
      errorMessage = `${key} must be a ${type}, but received ${typeof value}`;
      isValid = false;
    }

    return { errorMessage, isValid };
  }
}
