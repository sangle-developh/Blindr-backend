const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { getUser } = require("../models/User");

router.get("/", async (req, res) => {
  const users = await User.find();
  res.status(200).json({ success: true, msg: "Show all users", users: users });
});

router.get("/:username", async (req, res) => {
  try {
    const user = await getUser(req.params.username);
    res.send(user);
  } catch {
    res.status(404);
    res.send({ error: "User doesn't exist!" });
  }
});

router.post("/", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() =>
      res
        .status(200)
        .json({ success: true, msg: "Create new user", user: user })
    )
    .catch((err) => res.status(400).send(err));
});

router.put("/:username", (req, res) => {
  User.findOneAndUpdate(
    { username: req.params.username },
    req.body,
    (err, user) => {
      if (err) return res.status(500).send(err);
      return res
        .status(200)
        .json({ success: true, msg: `Update user ${req.params.username}` });
    }
  );
});

router.delete("/:username", (req, res) => {
  User.deleteOne({ username: req.params.username }, (err, user) => {
    if (err) return res.send(err);
    return res
      .status(200)
      .json({ success: true, msg: `Delete user ${req.params.username}` });
  });
});

module.exports = router;
