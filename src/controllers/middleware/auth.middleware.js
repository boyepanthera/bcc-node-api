import { User } from "../../models/User.model";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const CheckIfUserIsLoggedIn = async (req, res, next) => {
  try {
    if (!req.headers.authorization)
      return res.status(401).json({ message: "Auth token not attached!" });
    let token = req.headers.authorization.split(" ")[1];
    let decoded = await JWT.verify(token, process.env.SecretKey);
    let { _id } = decoded;
    let user = await User.findById(_id);
    if (!user)
      return res.status(404).json({ message: "No user with that detail" });
    req.decoded = decoded;
    req.user = user;
    next();
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};

export const CheckIfIsSelf = async (req, res, next) => {
  try {
    console.log(req.user._id);
    console.log(req.params.userId);
    if (req.user._id == req.params.userId) next();
    else {
      return res
        .status(403)
        .json({ message: "cannot influence another man's profile" });
    }
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};
