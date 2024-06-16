const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    console.log("Tabela ze wszystkimi kontaktami:");
    console.table(JSON.parse(data));
  } catch (err) {
    console.log(err.message);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const contactIds = contacts.find((contact) => contact.id === contactId);
    console.log("Wyszukany kontakt:", contactIds);
    return contactIds;
  } catch (err) {
    console.log(err.message);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const contactIds = contacts.filter((contact) => contact.id !== contactId);
    console.log(`Kontakt o id: ${contactId} został usunięty`, contactIds);
    return fs.writeFile("afterRemoved.js", JSON.stringify(contactIds));
  } catch (err) {
    console.log(err.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const addContact = {
      id: Date.now().toString(),
      name,
      email,
      phone,
    };
    console.log(`Kontakt został dodany:`, addContact);
    contacts.concat(addContact);
    return fs.writeFile("afterAdd.js", JSON.stringify(contacts));
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
