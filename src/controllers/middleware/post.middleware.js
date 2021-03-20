import { Post } from "../../models/Post.model";

export const CheckIfIsOwnPost = async (req, res, next) => {
  try {
    let post = await Post.findById(req.params.postId);
    if (req.user._id === post.author) return next();
    else {
      return res
        .status(403)
        .json({ message: "cannot influence another man's post" });
    }
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};
