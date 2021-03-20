import {
  FetchAllUserController,
  FetchAUserController,
  UpdateAUserController,
  DeleteAUserController,
  FetchSelfUserController,
} from "../controllers/majors/auth.controller";

import { Router } from "express";
import {
  CheckIfUserIsLoggedIn,
  CheckIfIsSelf,
} from "../controllers/middleware/auth.middleware";

export const router = Router();

router.route("/").get(CheckIfUserIsLoggedIn, FetchAllUserController);

router
  .route("/:userId/self")
  .get(CheckIfUserIsLoggedIn, CheckIfIsSelf, FetchSelfUserController);

router
  .route("/:userId")
  .get(CheckIfUserIsLoggedIn, FetchAUserController)
  .put(CheckIfUserIsLoggedIn, CheckIfIsSelf, UpdateAUserController)
  .delete(CheckIfUserIsLoggedIn, CheckIfIsSelf, DeleteAUserController);
