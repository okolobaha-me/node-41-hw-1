import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
} from "./contacts.js";
import { Command } from "commander";

const program = new Command();

program
  .requiredOption("-a, --action <type>")
  .option("-i, --id <type>")
  .option("-n, --name <type>")
  .option("-e, --email <type>")
  .option("-p, --phone <type>");

program.parse(process.argv);

const argv = program.opts();

const logger = (res) => {
  console.log(res);
};

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts().then(logger);
      break;

    case "get":
      getContactById(id).then(logger);
      break;

    case "add":
      addContact({ name, email, phone }).then(logger);
      break;

    case "remove":
      removeContact(id).then(logger);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
