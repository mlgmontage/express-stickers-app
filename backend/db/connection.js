require("dotenv").config();
const knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: process.env.DATABASE_URI,
  },
});

module.exports = knex;
