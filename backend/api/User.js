const { Router } = require("express");
const router = Router();
const Users = require("../db/User");

router.get("/", async (req, res) => {
  const users = await Users.getUsers();
  res.json(users);
});

module.exports = router;
