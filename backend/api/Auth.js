const { Router } = require("express");
const router = Router();
const User = require("../db/User");

router.get("/", async (req, res) => {
  res.json({
    message: "lock",
  });
});

function validUser(user) {
  const validEmail = typeof user.name == "string" && user.name.trim() != "";
  const validPassword =
    typeof user.password == "string" &&
    user.password.trim() != "" &&
    user.password.trim().length > 6;
  return validEmail && validPassword;
}

// or register
router.post("/signup", async (req, res, next) => {
  if (validUser(req.body)) {
    User.getOneByUsername(req.body.name).then((user) => {
      // if user not found
      if (!user) {
        // this is unique email
        res.json({
          message: "You can use this email to register",
        });
      } else {
        // email in use
        next(new Error("Email in use"));
      }
    });
  } else {
    next(new Error("Invalid user"));
  }
});

module.exports = router;
