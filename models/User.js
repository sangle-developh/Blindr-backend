const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, unique: true, dropDups: true },
  dob: { type: Date, required: true },
  gender: String,
  interest: String,
  maxDistance: Number,
  ageRange: String,
  about: String,
  employer: String,
  keywords: Array,
  pronouns: String,
  location: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
    },
  },
  isInstagramConnected: Boolean,
  isSpotifyConnected: Boolean,
});

module.exports.getUser = (username) => User.findOne({ username: username });

module.exports = mongoose.model("Users", schema);
