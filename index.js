// index.js

const { Command } = require('commander');
const { listContacts, getContactById, removeContact, addContact } = require('./contacts');

const program = new Command();

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

async function invokeAction() {
  const { action, id, name, email, phone } = program.opts();
  try {
    switch (action) {
      case 'list':
        const contacts = await listContacts();
        console.table(contacts);
        break;

      case 'get':
        const contactById = await getContactById(id);
        console.log(contactById);
        break;

      case 'add':
        const addedContact = await addContact(name, email, phone);
        console.log('Added contact:', addedContact);
        break;

      case 'remove':
        const removedContact = await removeContact(id);
        console.log('Removed contact:', removedContact);
        break;

      default:
        console.warn('Unknown action type!');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

invokeAction();
