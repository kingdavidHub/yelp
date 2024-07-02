require("dotenv").config();
const express = require("express");
const morgan  = require("morgan");


const app = express();

const PORT = process.env.PORT || 5050;

// Middleware
app.use(morgan('dev'));
app.use(express.json());

// Get all restaurants
app.get("/api/v1/restaurants", (req, res) => {
  return res.status(200).json({
    status: "success",
    data: {
      restaurant: ["mcdonald", "wendy"],
    },
  });
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
