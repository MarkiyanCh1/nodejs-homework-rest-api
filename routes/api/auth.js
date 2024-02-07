import express from "express";

import authController from "../../controllers/auth.js";

import { validateBody, isAuthenticate } from "../../middleware/index.js";

import {
  userSignupSchema,
  userSigninSchema,
  userSubscriptionSchema,
} from "../../schema/authSchema.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(userSignupSchema),
  authController.signup
);

authRouter.post(
  "/login",
  validateBody(userSigninSchema),
  authController.signin
);

authRouter.get("/current", isAuthenticate, authController.getCurrent);

authRouter.post("/logout", isAuthenticate, authController.logout);

authRouter.patch(
  "/",
  isAuthenticate,
  validateBody(userSubscriptionSchema),
  authController.subscription
);

export default authRouter;
