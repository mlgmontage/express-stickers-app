const knex = require("./connection");

getUsers = () => {
  return knex.select().from("Users");
};

module.exports = {
  getUsers,
};
