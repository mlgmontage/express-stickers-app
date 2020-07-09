const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(helmet());
app.use(cookieParser(process.env.COOKIE_SECRET));

// Serve static file
app.use(express.static("../frontend"));

// API
app.use("/users", require("./api/User"));
app.use("/auth", require("./api/Auth"));

// Error handler
app.use((err, req, res, next) => {
  res.status(500);
  res.json({
    error: err.message,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listenning on port ${port}`));
