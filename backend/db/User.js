const knex = require("./connection");

const getUserById = (id) => {
  return knex("Users").where({ id }).select();
};

const getOneByUsername = (username) => {
  return knex("Users").where("username", username).first();
};

const create = (user) => {
  return knex("Users")
    .insert(user, "id")
    .then((ids) => {
      return ids[0];
    });
};

module.exports = {
  getUserById,
  getOneByUsername,
  create,
};
