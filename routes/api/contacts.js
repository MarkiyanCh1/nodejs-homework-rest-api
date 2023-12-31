import express from "express";

import contactsController from "../../controllers/contacts.js";

import validateBody from "../../middleware/validateBody.js";
import { schema } from "../../schema/schema.js";

const router = express.Router();

router.get("/", contactsController.getAllContacts);

router.get("/:id", contactsController.getById);

router.post("/", validateBody(schema), contactsController.addNewContact);

router.delete("/:id", contactsController.deleteContactById);

router.put("/:id", validateBody(schema), contactsController.updateAllContacts);

export default router;
