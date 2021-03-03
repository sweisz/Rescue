import { printWelcomeMessage, printNoAccess } from "./messages";
import { askForAction, askForCredentials } from "./questions";
import { handleGetPassword, handleSetPassword, hasAccess } from "./commands";

import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { closeDB, connectDB, getCollection } from "./db";
dotenv.config();

const run = async () => {
  const url = process.env.MONGODB_URL;

  try {
    await connectDB(url, "Rescue-steffen");
    await getCollection("passwords");
    await closeDB();
  } catch (error) {
    console.error(error);
  }
};

// const run = async () => {
//   printWelcomeMessage();
//   const credentials = await askForCredentials();
//   if (!hasAccess(credentials.masterPassword)) {
//     printNoAccess();
//     run();
//     return;
//   }

//   const action = await askForAction();
//   switch (action.command) {
//     case "set":
//       handleSetPassword(action.passwordName);
//       break;
//     case "get":
//       handleGetPassword(action.passwordName);
//       break;
//   }
// };

run();
