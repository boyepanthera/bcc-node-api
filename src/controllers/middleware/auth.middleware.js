import { User } from "../../models/User.model";
import JWT from "jsonwebtoken";

export const CheckIfUserIsLoggedIn = async (req, res, next) => {
  try {
    let token = req.headers.authorization.split("")[1];
    let decoded = JWT.verify(token.process.env.SecretKey);
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