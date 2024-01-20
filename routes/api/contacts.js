import express from "express";

import contactsController from "../../controllers/contacts.js";

import {
  validateBody,
  isValidId,
  isEmptyBodyFavorite,
  isAuthenticate,
} from "../../middleware/index.js";
import {
  addSchema,
  updateSchema,
  patchSchema,
} from "../../schema/contactSchema.js";

const contactsRouter = express.Router();

contactsRouter.get("/", isAuthenticate, contactsController.getAllContacts);

contactsRouter.get(
  "/:id",
  isAuthenticate,
  isValidId,
  contactsController.getById
);

contactsRouter.post(
  "/",
  isAuthenticate,
  validateBody(addSchema),
  contactsController.addNewContact
);

contactsRouter.delete(
  "/:id",
  isAuthenticate,
  isValidId,
  contactsController.deleteContactById
);

contactsRouter.put(
  "/:id",
  isAuthenticate,
  isValidId,
  validateBody(updateSchema),
  contactsController.updateContactById
);

contactsRouter.patch(
  "/:id/favorite",
  isAuthenticate,
  isValidId,
  isEmptyBodyFavorite,
  validateBody(patchSchema),
  contactsController.updateStatusContact
);

export default contactsRouter;
