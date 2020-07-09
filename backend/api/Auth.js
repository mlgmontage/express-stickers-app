const { Router } = require("express");
const router = Router();
const User = require("../db/User");
const bcrypt = require("bcrypt");

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
    User.getOneByUsername(req.body.name).then(async (user) => {
      // if user not found
      if (!user) {
        // Hashing the password
        const hashed = await bcrypt.hash(req.body.password, 10);
        const user = {
          username: req.body.name,
          password: hashed,
        };

        User.create(user).then((id) => {
          res.json({
            id,
            message: "Registered",
          });
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

router.post("/login", async (req, res, next) => {
  if (validUser(req.body)) {
    // check to see if in DB
    const user = await User.getOneByUsername(req.body.name);
    if (user) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (isValidPassword) {
        const isSecure = req.app.get("env") != "development";
        res.cookie("user_id", user.id, {
          httpOnly: true,
          signed: true,
          secure: isSecure,
        });
        res.json({
          message: "Logged in",
        });
      } else {
        next(new Error("Invalid password"));
      }
    } else {
      next(new Error("User doesn't exist"));
    }
  } else {
    next(new Error("Invalid login"));
  }
});

module.exports = router;
