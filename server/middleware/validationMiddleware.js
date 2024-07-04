const { checkSchema, validationResult } = require("express-validator");
const { idValidationSchema, restaurantValidationSchema } = require("../utilities/validationSchema");

const checkId = [
  checkSchema(idValidationSchema),
    (req, res, next) => {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(400).json({
          errors: error.array(),
        });
      }
      next();
    }
]

const checkPayload = [
  checkSchema(restaurantValidationSchema),
  (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({
        errors: error.array(),
      });
    }
    next();
  }
]

const checkIdAndPayload = [
  checkSchema(idValidationSchema),
  checkSchema(restaurantValidationSchema),
  (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({
        errors: error.array(),
      });
    }
    next();
  }
]

module.exports = {
  checkId,
  checkIdAndPayload,
  checkPayload
};
