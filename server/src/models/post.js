// Post model
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  creator: String,
  track: {},
  create_date: Date,
  content: {},
});

const PostModel = mongoose.model("Post", PostSchema);

module.exports = { PostModel };