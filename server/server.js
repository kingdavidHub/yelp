require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const db = require("./db");

const app = express();

const PORT = process.env.PORT || 5050;

// Middleware
app.use(morgan("dev"));
app.use(express.json());

// Get all restaurants
app.get("/api/v1/restaurants", async (req, res, next) => {
  try {
    await db.query("SELECT * FROM restaurants", (err, rows) => {
      // Check if there is an error
      if (err) {
        res.status(500);
        next(new Error("Database error"));
      }

      const { rows } = rows;
      // Check if there are any results
      if (rows.length === 0) {
        res.status(404);
        throw new Error("Not found");
      }

      // Return the results
      return res.status(200).json({
        status: "success",
        results: rows.length,
        data: {
          restaurants: rows,
        },
      });
    });
  } catch (err) {
    return res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
});

// Get single restaurant
app.get("/api/v1/restaurants/:id", (req, res) => {
  const { id } = req.params;
  return res.status(200).json({
    status: "success",
    data: {
      id,
      restaurant: "mcdonald",
    },
  });
});

// Create new restaurant
app.post("/api/v1/restaurants", (req, res) => {
  return res.status(201).json({
    status: "success",
    data: {
      restaurant: "mcdonald",
    },
  });
});

// Update restaurant
app.put("/api/v1/restaurants/:id", (req, res) => {
  const { id } = req.params;
  return res.status(200).json({
    status: "success",
    data: {
      id,
      restaurant: "mcdonald",
    },
  });
});

// Delete restaurant
app.delete("/api/v1/restaurants/:id", (req, res) => {
  const { id } = req.params;
  return res.status(200).json({
    status: "success",
  });
});

// Error 404
app.get("*", (req, res, next) => {
  res.status(404);
  next(new Error("Not found"));
});

// Global error handler
app.use((err, req, res, next) => {
  res.status(res.statusCode).json({
    status: "error",
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
