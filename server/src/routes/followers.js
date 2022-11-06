const express = require("express");
const { FollowersModel, FollowingModel } = require("../models/followers");

const router = express.Router();

// sanity check
router.get("/ping", (req, res) => {
  res.send("pong!");
});

// Get followers
router.get("/user", async (req, res) => {
  // Retrieves all followers of a user
  const { user } = req.query;
  if (user) {
    try {
      let followers = await FollowersModel.find({ activeUserId: user }).exec();
      res.status(200).json({
        followers: followers.map((follower) => ({
          ...follower.toJSON(),
          id: follower._id,
        })),
      });
    } catch (e) {
      console.error(e);
      res.status(500).send("databasee error");
    }
  } else {
    console.log("error 400");
    res.status(400).send("no userId provided");
  }
});

// Get following users
router.get("/following", async (req, res) => {
  // Retrieves all followers of a user
  const { parentUserId } = req.query;
  if (parentUserId) {
    try {
      let following = await FollowingModel.find({
        parentUserId: parentUserId,
      }).exec();
      console.log(following);
      res.status(200).json({
        following: following.map((follow) => ({
          ...follow.toJSON(),
          id: follow._id,
        })),
      });
    } catch (e) {
      console.error(e);
      res.status(500).send("databasee error");
    }
  } else {
    console.log("error 400");
    res.status(400).send("no parentUserId provided");
  }
});

// follow user
router.post("/follow", async (req, res) => {
  // adds a follower to the database
  const { activeUserId, parentUserId } = req.body;
  console.log(activeUserId);
  console.log(parentUserId);
  const newFollow = new FollowingModel({
    parentUserId: parentUserId,
    activeUserId: activeUserId,
  });
  try {
    await newFollow.save();
    res.status(200).json({
      id: String(newFollow._id),
    });
  } catch (e) {
    console.log(e);
    res.status(500).send("database error");
  }
});

// unfollow user
router.post("/unfollow", async (req, res) => {
  // deletes follower from the database
  const { activeUserId, parentUserId } = req.body;
  try {
    if (activeUserId) {
      await FollowingModel.findByIdAndDelete(activeUserId, parentUserId);
      res.status(200).send("unfollowing");
    } else {
      res.status(400).sent("no such following");
    }
  } catch (e) {
    console.error(e);
    res.status(500).send("database error");
  }
});

module.exports = router;
