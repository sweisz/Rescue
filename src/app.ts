import { printWelcomeMessage, printNoAccess } from "./messages";
import { askForAction, askForCredentials } from "./questions";
import { handleGetPassword, handleSetPassword, hasAccess } from "./commands";

import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import {
  closeDB,
  connectDB,
  createPasswordDoc,
  getCollection,
  readPasswordDoc,
  deletePasswordDoc,
  updatePasswordValue,
  updatePasswordDoc,
} from "./db";
dotenv.config();

const run = async () => {
  const url = process.env.MONGODB_URL;

  try {
    await connectDB(url, "Rescue-steffen");

    // await createPasswordDoc({
    //   name:"Steffen";
    //   value:"1234";
    // });

    // console.log(await readPasswordDoc("Steffen"));

    // await updatePasswordValue("Steffen", "0000");

    // console.log(await deletePasswordDoc("Steffen"));
    await updatePasswordDoc("steffen", { value: "1234" });

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
