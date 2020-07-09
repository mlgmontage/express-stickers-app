const { Router } = require("express");
const router = Router();
const User = require("../db/User");
const Stickers = require("../db/Sticker");

router.get("/:id", async (req, res, next) => {
  const id = req.params.id;

  if (!isNaN(id)) {
    const user = await User.getUserById(id);
    if (user.length > 0) {
      const { id, username } = user[0];
      res.json({ id, username });
    } else {
      next(new Error("User Not found"));
    }
  } else {
    next(new Error("Invalid user ID"));
  }
});

router.get("/:id/stickers", async (req, res, next) => {
  const id = req.params.id;

  if (!isNaN(id)) {
    const user = await User.getUserById(id);
    if (user.length > 0) {
      const { id, username } = user[0];
      const stickers = await Stickers.getStickerByUserId(id);
      res.json({ id, username, stickers });
    } else {
      next(new Error("User Not found"));
    }
  } else {
    next(new Error("Invalid user ID"));
  }
});

module.exports = router;
