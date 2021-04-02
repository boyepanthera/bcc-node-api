import express from "express";
import { Post } from "./models/Post.model";
import mongoose from "mongoose";
import { router as AuthModule } from "./routes/auth.route";
import { router as UserModule } from "./routes/user.route";
import { router as PostModule } from "./routes/post.route";
import cors from "cors";

const app = express();
app.options("*", cors());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const ConnectToDB = async () => {
  return await mongoose.connect(
    "mongodb+srv://boye:boye@xcessspace.izpoz.gcp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }
  );
};

ConnectToDB()
  .then((db) => console.log("Connected to DB"))
  .catch((err) => {
    console.log(`Issues connecting to DB. ${err.message}`);
    // console.log(err);
  });

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => res.status(200).json({ message: "blog api" }));
// app.get("/signup", (req, res) => res.render("signup"));
// app.get("/dashboard", (req, res) => res.render("dashboard"));

// // Fetch all post
// app.get("/post", async (req, res) => {
//   try {
//     let posts = await Post.find();
//     res.json({ message: "Posts fetched", posts });
//   } catch (err) {
//     res.status(501).json({
//       message: "Error occured!",
//       data: err.message,
//     });
//   }
// });

// // create  a post
// app.post("/post", async (req, res) => {
//   try {
//     let post = await Post.create(req.body);
//     res.status(201).json({ message: "Post created", post });
//   } catch (err) {
//     res.status(501).json({
//       message: "Error occured!",
//       data: err.message,
//     });
//   }
// });

// // Fetch by Id
// app.get("/post/:id", async (req, res) => {
//   try {
//     let { id } = req.params;
//     let post = await Post.findById(id);
//     res.status(201).json({ message: "Post fetched", post });
//   } catch (err) {
//     res.status(501).json({
//       message: "Error occured!",
//       data: err.message,
//     });
//   }
// });

// // Update by Id
// app.put("/post/:id", async (req, res) => {
//   try {
//     let { id } = req.params;
//     let post = await Post.findByIdAndUpdate(id, req.body, { new: true });
//     res.status(200).json({ message: "Post updated", post });
//   } catch (err) {
//     res.status(501).json({
//       message: "Error occured!",
//       data: err.message,
//     });
//   }
// });

// // Delete by Id
// app.delete("/post/:id", async (req, res) => {
//   try {
//     let { id } = req.params;
//     let deletedPost = await Post.findByIdAndDelete(id);
//     res.status(200).json({ message: "Post deleted" });
//   } catch (err) {
//     res.status(501).json({
//       message: "Error occured!",
//       data: err.message,
//     });
//   }
// });

app.use("/auth", AuthModule);
app.use("/user", UserModule);
app.use("/post", PostModule);

if (process.env.NODE_ENV !== "production") {
  app.listen(4001, () => console.log("node server started"));
} else {
  app.listen(process.env.PORT, process.env.IP, () =>
    console.log("node server started")
  );
}
