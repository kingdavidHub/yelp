const idValidationSchema = {
  id: {
    notEmpty: {
      errorMessage: "ID cannot be empty"
    },
    isInt: {
      errorMessage: "ID must be an integer"
    }
  }
};


const restaurantValidationSchema = {
  name: {
    isLength: {
      errorMessage: "Name must be at least 3 characters",
      options: { min: 3 },
    },
    notEmpty: {
      errorMessage: "Name cannot be empty"
    },
    isString: {
      errorMessage: "Name must be a string"
    }
  },
  location: {
    isLength: {
      errorMessage: "Location must be at least 3 characters",
      options: { min: 3 },
    },
    notEmpty: {
      errorMessage: "Location cannot be empty"
    },
    isString: {
      errorMessage: "Location must be a string"
    }
  },
  price_range: {
    errorMessage: "Price range must between 1 and 5",
    isInt: {
      options: {
        min: 1,
        max: 5
      },
      errorMessage: "Price range must be an integer between 1 and 5"
    },
    notEmpty: {
      errorMessage: "Price range cannot be empty"
    }
  }
}

module.exports = {
  idValidationSchema,
  restaurantValidationSchema
}
