const knex = require("./connection");

const getUsers = () => {
  return knex("Users").select();
};

const getOneByUsername = (username) => {
  return knex("Users").where("username", username).first();
};

module.exports = {
  getUsers,
  getOneByUsername,
};
