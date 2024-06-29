require("dotenv").config();
const express = require("express");

const app = express();

const PORT = process.env.PORT || 5050;

app.get("/test", (req, res) => {
  return res.status(200).json({
    test: "Script test",
  });
});

app.get("*", (req, res, next) => {
  res.status(404);
  next(new Error("Not found"));
});

app.use((err, req, res, next) => {
  res.status(res.statusCode).json({
    status: "error",
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
