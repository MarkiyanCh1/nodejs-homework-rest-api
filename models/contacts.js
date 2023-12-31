import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

// const contactsPath = path.join(__dirname, "./contacts.json");
const contactsPath = path.resolve("models", "contacts.json");

export const listContacts = async () => {
  const listContacts = await fs.readFile(contactsPath);
  return JSON.parse(listContacts);
};

export const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find(({ id }) => id === contactId);
  return contact || null;
};

export const addContact = async (body) => {
  const allContacts = await listContacts();
  const newContact = { id: nanoid(), ...body };
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact;
};

export const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const contactIndex = allContacts.findIndex(({ id }) => id === contactId);
  if (contactIndex === -1) {
    return null;
  }
  const deletedContact = allContacts.splice(contactIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return deletedContact;
};

export const updateContact = async (contactId, changes) => {
  const allContacts = await listContacts();
  const contactIndex = allContacts.findIndex(({ id }) => id === contactId);
  if (contactIndex === -1) {
    return null;
  }
  allContacts[contactIndex] = {
    id: contactId,
    ...allContacts[contactIndex],
    ...changes,
  };
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return allContacts[contactIndex];
};
