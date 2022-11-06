  const express = require("express");
const { PostModel } = require("../models/post");

const router = express.Router();

// sanity check
router.get("/ping", (req, res) => {
  res.send("pong");
});

// create post
router.post("/create", async (req, res) => {
  // creates a post in the database
  const { user, track, content } = req.body;
  if (user && track && content) {
    const newPost = new PostModel({
      creator: user,
      track: track,
      create_date: Date.now(),
      content: content,
    });

    try {
      await newPost.save();
      res.status(200).json({
        id: String(newPost._id),
      });
    } catch (e) {
      console.log(e)
      res.status(500).send("database error");
    }
  } else {
    res.status(400).send("requires params: user, track, content");
  }
});

// delete post
router.post("/delete", async (req, res) => {
  // deletes a post from the database
  const { post_id } = req.body;
  try {
    if (post_id) {
      await PostModel.findByIdAndDelete(post_id);
      res.status(200).send("post deleted");
    } else {
      res.status(400).send("no post id");
    }
  } catch (e) {
    console.error(e);
    res.status(500).send("database error");
  }
});

router.get("/get", async (req, res) => {
  // retrieves a post from the database
  const { post_id } = req.query;
  if (post_id) {
    // get post by id
    try {
      const post = await PostModel.findById(post_id);
      res.status(200).json({
        post: {
          ...post.toJSON(),
          id: post._id,
        },
      });
    } catch (e) {
      console.error(e);
      res.status(500).send("database error");
    }
  } else {
    res.status(400).send("no post_id provided");
  }
});

router.get("/getbyuser", async (req, res) => {
  // retrieves a post from the database
  const { user } = req.query;
  if (user) {
    try {
      let posts = await PostModel.find({ creator: user }).exec();
      res.status(200).json({
        posts: posts.map((post) => ({
          ...post.toJSON(),
          id: post._id,
        })),
      });
    } catch (e) {
      console.error(e);
      res.status(500).send("database error");
    }
  } else {
    res.status(400).send("no user provided");
  }
});

module.exports = router;
