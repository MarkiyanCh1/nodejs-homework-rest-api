import Contact from "../models/Contact.js";

import { httpError, tryCatch } from "../helpers/index.js";

const getAllContacts = async (req, res) => {
  const allContacts = await Contact.find();
  res.status(200).json(allContacts);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);
  if (!contact) {
    throw httpError(404, "Contact not found");
  }
  res.status(200).json(contact);
};

const addNewContact = async (req, res) => {
  const newContact = await Contact.create(req.body);
  res.status(201).json(newContact);
};

const deleteContactById = async (req, res) => {
  const { id } = req.params;
  const deletedContact = await Contact.findByIdAndDelete(id);
  if (!deletedContact) {
    throw httpError(404, "Contact not found");
  }
  res.status(200).json({ message: "contact deleted" });
};

const updateContactById = async (req, res) => {
  const { id } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updatedContact) {
    throw httpError(404, "Contact not found");
  }
  res.status(200).json(updatedContact);
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const updatedStatus = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updatedStatus) {
    throw httpError(404, "Contact not found");
  }
  res.status(200).json(updatedStatus);
};

export default {
  getAllContacts: tryCatch(getAllContacts),
  getById: tryCatch(getById),
  addNewContact: tryCatch(addNewContact),
  deleteContactById: tryCatch(deleteContactById),
  updateContactById: tryCatch(updateContactById),
  updateStatusContact: tryCatch(updateStatusContact),
};
