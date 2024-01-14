import { isValidObjectId } from "mongoose";

import { httpError } from "../helpers/index.js";

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return next(httpError(400, `${id} not valid id`));
  }
  next();
};

export default isValidId;
