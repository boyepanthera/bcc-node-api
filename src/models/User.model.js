import Mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new Schema({
  _id: Schema.Types.ObjectId,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

UserSchema.pre("save", (next) => {
  const { password } = this;
  let salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  this.password = hashedPassword;
  return next();
});

UserSchema.methods.comparePassword = (clientPassword, cb) => {
  bcrypt.compare(clientPassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

export const User = Mongoose.model("User", UserSchema);
