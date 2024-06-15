const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");
// console.log("path", contactsPath);

function listContacts() {
  fs.readFile(contactsPath)
    .then((data) => console.table(JSON.parse(data)))
    .catch((err) => console.log(err.message));
}

function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data);
      //   console.log('contacts',contacts);
      const contactIds = contacts.find((contact) => contact.id === contactId);
      console.log("get contact", contactIds);
      return contactIds;
    })
    .catch((err) => console.log(err.message));
}

function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data);
      //   console.log("contacts w remove", contacts);
      const contactIds = contacts.filter((contact) => contact.id !== contactId);
      console.log("new array", contactIds);
      return fs.writeFile("afterRemoved.js", JSON.stringify(contactIds));
    })
    .catch((err) => console.log(err.message));
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data);
      const addContact = {
        id: Date.now().toString(),
        name,
        email,
        phone,
      };
      console.log("addContact", addContact);
      contacts.concat(addContact);
      //   console.log("addContact2", contacts);
      return fs.writeFile("afterAdd.js", JSON.stringify(contacts));
    })
    .catch((err) => console.log(err.message));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
