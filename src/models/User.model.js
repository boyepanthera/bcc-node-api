import Mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
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

export const User = Mongoose.model("User", UserSchema);
