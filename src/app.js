import express from "express";
import { Post } from "./models/Post.model";
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => res.render("login"));
app.get("/signup", (req, res) => res.render("signup"));
app.get("/dashboard", (req, res) => res.render("dashboard"));

// Fetch all post
app.get("/post", async (req, res) => {
  try {
    let posts = await Post.find();
    res.json({ message: "Posts fetched", posts });
  } catch (err) {
    res.status(501).json({
      message: "Error occured!",
      data: err.message,
    });
  }
});

// create  a post
app.post("/post", async (req, res) => {
  try {
    let post = await Post.create(req.body);
    res.status(201).json({ message: "Post created", post });
  } catch (err) {
    res.status(501).json({
      message: "Error occured!",
      data: err.message,
    });
  }
});

// Fetch by Id
app.get("/post/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let post = await Post.findById(id);
    res.status(201).json({ message: "Post fetched", post });
  } catch (err) {
    res.status(501).json({
      message: "Error occured!",
      data: err.message,
    });
  }
});

// Update by Id
app.put("/post/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let post = await Post.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: "Post updated", post });
  } catch (err) {
    res.status(501).json({
      message: "Error occured!",
      data: err.message,
    });
  }
});

// Delete by Id
app.delete("/post/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let deletedPost = await Post.findByIdAndDelete(id);
    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    res.status(501).json({
      message: "Error occured!",
      data: err.message,
    });
  }
});

app.listen(4004, () => console.log("node server started"));
