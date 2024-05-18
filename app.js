require("dotenv").config();
const db = require("./config/database");
const express = require("express");
const app = express();
const morgan = require("morgan");
const routes = require("./routes");
const { PORT } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(morgan("dev"));
app.use(routes);

app.get("/", (req, res, next) => {
  return res.status(200).send("Welcome to our api");
});

// Error handling 404
app.use((_req, res) => {
  return res.status(404).json({
    error: "Error Message",
  });
});

// Error handling 500
app.use((_req, res) => {
  return res.status(500).json({
    error: "Error Message",
  });
});

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
