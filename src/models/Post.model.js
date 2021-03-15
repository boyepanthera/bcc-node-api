import Mongoose from "mongoose";

const PostSchema = new Mongoose.Schema({
  title: String,
  tags: [String],
  body: String,
});

export const Post = Mongoose.model("Post", PostSchema);
