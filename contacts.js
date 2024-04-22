import { promises as fs } from 'fs';
import path from 'path';

// Path to the contacts.json file
const contactsPath = path.join(__dirname, 'contacts.json');

/**
 * Lists all contacts in the contacts.json file.
 * Returns an empty array if the file is empty or does not exist.
 */
async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

/**
 * Retrieves a contact by its ID from the contacts.json file.
 * Returns null if the contact is not found.
 */
async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    return contacts.find(contact => contact.id === contactId) || null;
  } catch (error) {
    return null;
  }
}

/**
 * Removes a contact by its ID from the contacts.json file.
 * Returns the removed contact if successful, or null if the contact is not found.
 */
async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    const updatedContacts = contacts.filter(contact => contact.id!== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2), 'utf-8');
    return contacts.find(contact => contact.id === contactId) || null;
  } catch (error) {
    return null;
  }
}

/**
 * Adds a new contact to the contacts.json file.
 * Returns the newly created contact.
 */
async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    const newContact = {
      id: Date.now().toString(),
      name,
      email,
      phone
    };
    const updatedContacts = [...contacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2), 'utf-8');
    return newContact;
  } catch (error) {
    return null;
  }
}

export { listContacts, getContactById, removeContact, addContact };