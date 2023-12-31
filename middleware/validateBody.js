import { httpError } from "../helpers/index.js";

const validateBody = (schema) => {
  const func = (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      next(httpError(400, "Missing fields."));
      return;
    }
    const { error } = schema.validate(req.body);
    if (error) {
      next(httpError(400, error.message));
    }
    next();
  };
  return func;
};

export default validateBody;
