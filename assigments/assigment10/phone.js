const fs = require("fs/promises");

const [, , command, phone, name] = process.argv;

async function getContacts() {
  try {
    const readData = await fs.readFile("contacts.json", "utf-8");
    return JSON.parse(readData || "[]");
  } catch (e) {
    if (e.code === "ENOENT") {
      await fs.writeFile("contacts.json", "[]");
      return [];
    }
    throw e;
  }
}

async function phoneOperations(command, phone, name) {
  const contacts = await getContacts();

  if (command === "add") {
    if (!phone || !name) {
      console.log("Phone number and name are required");
      return;
    }

    if (contacts.some((contact) => contact.phone === phone)) {
      console.log("This phone number already exists");
      return;
    }

    contacts.push({ phone, name });

    await fs.writeFile("contacts.json", JSON.stringify(contacts));

    console.log("Contact added successfully");
    return;
  }

  if (command === "delete") {
    if (!phone) {
      console.log("Phone number is required");
      return;
    }

    const filteredContacts = contacts.filter(
      (contact) => contact.phone !== phone,
    );

    await fs.writeFile("contacts.json", JSON.stringify(filteredContacts));

    console.log("Contact deleted successfully");
    return;
  }

  if (command === "show") {
    if (contacts.length === 0) {
      console.log("There is no contacts");
      return;
    }
    console.log(contacts);
  }
}

phoneOperations(command, phone, name);
