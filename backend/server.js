const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());

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
