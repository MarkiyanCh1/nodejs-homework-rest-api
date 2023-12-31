import express from "express";

import contactsController from "../../controllers/contacts.js";

import validateBody from "../../middleware/validateBody.js";
import { addSchema, updateSchema } from "../../schema/schema.js";

const router = express.Router();

router.get("/", contactsController.getAllContacts);

router.get("/:id", contactsController.getById);

router.post("/", validateBody(addSchema), contactsController.addNewContact);

router.delete("/:id", contactsController.deleteContactById);

router.put(
  "/:id",
  validateBody(updateSchema),
  contactsController.updateAllContacts
);

export default router;
