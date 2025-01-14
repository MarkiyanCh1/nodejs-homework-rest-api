import { httpError } from "../helpers/index.js";

const isEmptyBodyFavorite = (req, res, next) => {
  const { length } = Object.keys(req.body);
  if (!length) {
    return next(httpError(400, "missing field favorite"));
  }
  next();
};

export default isEmptyBodyFavorite;
