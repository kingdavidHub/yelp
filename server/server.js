require("dotenv").config();
const express = require("express");
const { matchedData } = require("express-validator");
const morgan = require("morgan");
const cors = require("cors");
const db = require("./db");
const {
  checkId,
  checkIdAndPayload,
  checkPayload,
  checkIdAndReviewsPayload,
} = require("./middleware/validationMiddleware");

const app = express();

const PORT = process.env.PORT || 5050;

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// Get all restaurants
app.get("/api/v1/restaurants", async (req, res, next) => {
  try {
    const { rows } = await db.query("SELECT * FROM restaurants");

    // Return the results
    return res.status(200).json({
      status: "success",
      results: rows.length,
      data: {
        restaurants: rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Get single restaurant
app.get("/api/v1/restaurants/:id", checkId, async (req, res) => {
  const { id } = matchedData(req);
  try {
    const { rows } = await db.query(
      "SELECT * FROM restaurants WHERE  id = $1",
      [id]
    );

    return res.status(200).json({
      status: "success",
      data: {
        restaurant: rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});
// Get restaurants reviews
app.get("/api/v1/restaurants/:id/reviews", checkId, async (req, res) => {
  const { id } = matchedData(req);

  try {
    const { rows } = await db.query(
      "SELECT name, review, rating FROM reviews where restaurant_id = $1",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No reviews found for this restaurant",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        reviews: rows,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
});

// Create restaurant reviews
app.post(
  "/api/v1/restaurants/:id/reviews",
  checkIdAndReviewsPayload,
  async (req, res) => {
    const { id, name, rating, review } = matchedData(req);

    try {
      const { rows } = await db.query(
        "INSERT INTO reviews(restaurant_id, name, rating, review) VALUES($1, $2, $3, $4) RETURNING *",
        [id, name, rating, review]
      );

      delete rows[0].restaurant_id;

      return res.status(201).json({
        status: "success",
        data: {
          review: rows[0],
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  }
);

// Create new restaurant
app.post("/api/v1/restaurants", checkPayload, async (req, res) => {
  // Get validated data
  const { name, location, price_range } = matchedData(req);
  try {
    const { rows } = await db.query(
      "INSERT INTO restaurants(name, location, price_range) VALUES($1, $2, $3) RETURNING *",
      [name, location, price_range]
    );

    return res.status(201).json({
      status: "success",
      data: {
        restaurant: rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// Update restaurant
app.put("/api/v1/restaurants/:id", checkIdAndPayload, async (req, res) => {
  const { id, name, location, price_range } = matchedData(req);
  try {
    const { rows } = await db.query(
      "UPDATE restaurants SET name = $1, location=$2, price_range=$3 where id=$4 RETURNING *",
      [name, location, price_range, id]
    );

    return res.status(200).json({
      status: "success",
      data: {
        restaurant: rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// Delete restaurant
app.delete("/api/v1/restaurants/:id", checkId, async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await db.query(
      "DELETE FROM restaurants WHERE id = $1 RETURNING id",
      [id]
    );

    return res.status(200).json({
      status: "success",
      message: `Restaurant with the id ${rows[0].id} has been deleted`,
    });
  } catch (error) {
    console.log(error);
  }
});

// Error 404
app.get("*", (req, res, next) => {
  const error = new Error("Not found");
  error.statusCode = 404;
  next(error);
});

// Global error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: "error",
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
