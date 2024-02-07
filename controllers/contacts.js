import Contact from "../models/Contact.js";

import { httpError, tryCatch } from "../helpers/index.js";

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  const query = favorite ? { owner, favorite } : { owner };

  const allContacts = await Contact.find(query, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "email subscription");
  res.status(200).json(allContacts);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const contact = await Contact.findOne({ owner, _id: id });
  if (!contact) {
    throw httpError(404, "Contact not found");
  }
  res.status(200).json(contact);
};

const addNewContact = async (req, res) => {
  const { _id: owner } = req.user;
  const newContact = await Contact.create({ ...req.body, owner });
  res.status(201).json(newContact);
};

const deleteContactById = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const deletedContact = await Contact.findOneAndDelete({ owner, _id: id });
  if (!deletedContact) {
    throw httpError(404, "Contact not found");
  }
  res.status(200).json({ message: "contact deleted" });
};

const updateContactById = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const updatedContact = await Contact.findOneAndUpdate(
    { owner, _id: id },
    req.body,
    {
      new: true,
    }
  );
  if (!updatedContact) {
    throw httpError(404, "Contact not found");
  }
  res.status(200).json(updatedContact);
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const updatedStatus = await Contact.findOneAndUpdate(
    { owner, _id: id },
    req.body,
    {
      new: true,
    }
  );
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
