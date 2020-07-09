const knex = require("./connection");

const getUsers = () => {
  return knex("Users").select();
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
  getUsers,
  getOneByUsername,
  create,
};
