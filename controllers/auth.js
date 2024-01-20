import User from "../models/User.js";

import { httpError, tryCatch } from "../helpers/index.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw httpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw httpError(401, "Email or password invalid!");
  }

  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw httpError(401, "Email or password invalid!");
  }

  const { _id: id } = user;
  const payload = { id };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
  await User.findByIdAndUpdate(user._id, { token });

  res
    .status(200)
    .json({ token, user: { email, subscription: user.subscription } });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({ email, subscription });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json({});
};

const subscription = async (req, res) => {
  const { _id } = req.user;
  const userSubscription = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
  if (!userSubscription) {
    throw httpError(404, "Not found");
  }
  res.status(200).json(userSubscription);
};

export default {
  signup: tryCatch(signup),
  signin: tryCatch(signin),
  getCurrent: tryCatch(getCurrent),
  logout: tryCatch(logout),
  subscription: tryCatch(subscription),
};
