const express = require("express");
const User = require("../models/User");
const router = express.Router();
const Matching = require("../models/Matching");

router.get("/", async (req, res) => {
  const users = await User.find();
  res.status(200).json({ success: true, msg: "Show all users", users: users });
});

router.get("/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    res.send(user);
  } catch {
    res.status(404);
    res.send({ error: "User doesn't exist!" });
  }
});

// router.get("/couple", async (req, res) => {
//   try {
//     const user = await User.findOne({ username: req.params.username });
//     const users = await User.find();
//     const couple = Matching.getCouple(user, users);
//     res.send(couple);
//   } catch {
//     res.status(404);
//     res.send({ error: "Couldn't match!" });
//   }
// });

router.get("/couple", async (req, res) => {
  console.log(req);
  try {
    const user = await User.findOne({ username: req.params.username });
    const users = await User.find();
    const couple = Matching.getCouple(user, users);
    couple
      .save()
      .then(() =>
        res.status(200).json({ success: true, msg: "A match!", couple: couple })
      )
      .catch((err) => res.status(400).send(err));
  } catch {
    res.status(404);
    res.send({ error: "Couldn't match!" });
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
