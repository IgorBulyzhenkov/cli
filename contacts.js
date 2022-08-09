const path = require("path");
const fs = require("fs").promises;
const { v4: uuidv4 } = require("uuid");

//  Створив змінну з прописаним шляхом до файлу contacts.js
const contactsPath = path.resolve("db/contacts.json");

//Функція для перегляду всіх контактів у файлі contacts.js
async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    console.table(JSON.parse(data));
  } catch (error) {
    console.log(error);
  }
}

//Функція для знаходження одного контакту по ID
async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const user = JSON.parse(data);
    user.map((el) => {
      if (el.id === String(contactId)) {
        return console.table(el);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

//Функція для видалення контакту по ID
async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const user = JSON.parse(data);
    const newData = user.filter((el) => {
      if (el.id !== String(contactId)) {
        return el;
      }
    });
    fs.writeFile(contactsPath, JSON.stringify(newData));
    console.table(newData);
  } catch (error) {
    console.log(error);
  }
}

// Функція додавання контакту до contacts.js
async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const user = JSON.parse(data);
    const id = uuidv4();
    const newData = [...user, { id, name, email, phone }];
    fs.writeFile(contactsPath, JSON.stringify(newData));
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
