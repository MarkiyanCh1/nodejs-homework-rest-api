import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} from "../models/contacts.js";

import { httpError, tryCatch } from "../helpers/index.js";

const getAllContacts = async (req, res) => {
  const allContacts = await listContacts();
  res.status(200).json(allContacts);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const contact = await getContactById(id);
  if (!contact) {
    throw httpError(404, "Contact not found");
  }
  res.status(200).json(contact);
};

const addNewContact = async (req, res) => {
  const newContact = await addContact(req.body);
  res.status(201).json(newContact);
};

const deleteContactById = async (req, res) => {
  const { id } = req.params;
  const deletedContact = await removeContact(id);
  if (!deletedContact) {
    throw httpError(404, "Contact not found");
  }
  res.status(200).json({ message: "contact deleted" });
};

const updateAllContacts = async (req, res) => {
  const { id } = req.params;
  const updatedContactById = await updateContact(id, req.body);
  if (!updatedContactById) {
    throw httpError(404, "Contact not found");
  }
  res.status(200).json(updatedContactById);
};

export default {
  getAllContacts: tryCatch(getAllContacts),
  getById: tryCatch(getById),
  addNewContact: tryCatch(addNewContact),
  deleteContactById: tryCatch(deleteContactById),
  updateAllContacts: tryCatch(updateAllContacts),
};
