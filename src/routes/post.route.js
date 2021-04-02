import {
  CreatePostController,
  FetchAllPostController,
  FetchAllOwnPostController,
  FetchAPostController,
  UpdateAPostController,
  DeleteAPostController,
} from "../controllers/majors/post.controller";

import { Router } from "express";
import { CheckIfIsOwnPost } from "../controllers/middleware/post.middleware";
import { CheckIfUserIsLoggedIn } from "../controllers/middleware/auth.middleware";
export const router = Router();

router
  .route("/")
  .get(CheckIfUserIsLoggedIn, FetchAllPostController)
  .post(CheckIfUserIsLoggedIn, CreatePostController);

router
  .route("/:userId/self")
  .get(CheckIfUserIsLoggedIn, FetchAllOwnPostController);

router
  .route("/:postId")
  .get(CheckIfUserIsLoggedIn, FetchAPostController)
  .put(CheckIfUserIsLoggedIn, CheckIfIsOwnPost, UpdateAPostController)
  .delete(CheckIfUserIsLoggedIn, CheckIfIsOwnPost, DeleteAPostController);
