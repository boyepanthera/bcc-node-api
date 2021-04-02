import { Post } from "../../models/Post.model";

export const CheckIfIsOwnPost = async (req, res, next) => {
  try {
    let post = await Post.findById(req.params.postId);
    console.log(post);
    if (!post) return res.status(404).json({ message: "Post not found" });
    if (!post.author)
      return res
        .status(403)
        .json({ message: "cannot influce another man's resource" });
    console.log(req.user._id, post.author);
    const data = req.user._id.toString();
    console.log(data);
    console.log(data == post.author);
    console.log(data === post.author);
    if (req.user._id.toString() === post.author.toString()) return next();
    else {
      return res
        .status(403)
        .json({ message: "cannot influence another man's post" });
    }
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};
