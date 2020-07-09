const knex = require("./connection");

const getStickerByUserId = (User_id) => {
  return knex("Stickers").where({ User_id }).select();
};

const create = (sticker) => {
  return knex("Stickers")
    .insert(sticker, "id")
    .then((ids) => {
      return ids[0];
    });
};

module.exports = {
  getStickerByUserId,
  create,
};
