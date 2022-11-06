// Followers model
const mongoose = require("mongoose");

const FollowersSchema = new mongoose.Schema({
  parentUserId: String,
  activeUserId: String,
});

const FollowingSchema = new mongoose.Schema({
  parentUserId: String,
  activeUserId: String,
});

const FollowersModel = mongoose.model("Followers", FollowersSchema);
const FollowingModel = mongoose.model("Following", FollowingSchema);

//module.exports = { FollowersModel, FollowingModel };