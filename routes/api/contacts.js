import express from "express";

import contactsController from "../../controllers/contacts.js";

import { validateBody, isValidId } from "../../middleware/index.js";
import { addSchema, updateSchema, patchSchema } from "../../schema/schema.js";

const router = express.Router();

router.get("/", contactsController.getAllContacts);

router.get("/:id", isValidId, contactsController.getById);

router.post("/", validateBody(addSchema), contactsController.addNewContact);

router.delete("/:id", isValidId, contactsController.deleteContactById);

router.put(
  "/:id",
  isValidId,
  validateBody(updateSchema),
  contactsController.updateContactById
);

router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(patchSchema),
  contactsController.updateStatusContact
);

export default router;
