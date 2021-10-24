const express = require("express");
const User = require("../models/User");
const router = express.Router();
const Matching = require("../models/Matching");

router.get("/:username", async (req, res) => {
  console.log(req.params);
  try {
    const user = await User.findOne({ username: req.params.username });
    const users = await User.find();
    console.log(user);
    console.log(users);
    const couple = Matching.getCouple(user, users);
    console.log(couple);
    res.send(couple);
  } catch {
    res.status(404);
    res.send({ error: "Couldn't match!" });
  }
});

module.exports = router;
