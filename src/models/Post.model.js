import Mongoose, { Schema } from "mongoose";

const PostSchema = new Schema({
  id: Schema.Types.ObjectId,
  title: String,
  tags: [String],
  postedOn: {
    type: Date,
    default: Date.now(),
  },
  body: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Post = Mongoose.model("Post", PostSchema);
