import { Post } from "../../models/Post.model";
import { ValidatePostData } from "../../validators/post.validator";

export const CreatePostController = async (req, res) => {
  try {
    let { err, value } = await ValidatePostData(req.body);
    if (err) return res.status(400).json({ message: err.details[0].message });
    let { _id } = req.decoded;
    let post = await Post.create({ ...value, author: _id });
    return res.status(201).json({ message: "post created", post });
  } catch (err) {
    res.status(501).json({ message: err.message });
  }
};

export const FetchAllPostController = async (req, res) => {
  try {
    let posts = await Post.find();
    return res.status(200).json({ message: "posts fetched", posts });
  } catch (err) {
    res.status(501).json({ message: err.message });
  }
};

export const FetchAPostController = async (req, res) => {
  try {
    let { postId } = req.params;
    let post = await User.findById(postId).populate("author");
    return res.status(200).json({ message: "post fetched", post });
  } catch (err) {
    res.status(501).json({ message: err.message });
  }
};

export const UpdateAPostController = async (req, res) => {
  try {
    let { postId } = req.params;
    let post = await User.findByIdAndUpdate(postId, value, { new: true });
    return res.status(200).json({ message: "post updated", post });
  } catch (err) {
    res.status(501).json({ message: err.message });
  }
};

export const DeleteAPostController = async (req, res) => {
  try {
    let { postId } = req.params;
    await User.findByIdAndDelete(postId);
    return res.status(200).json({ message: "post deleted" });
  } catch (err) {
    res.status(501).json({ message: err.message });
  }
};
