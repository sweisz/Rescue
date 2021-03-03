import { printWelcomeMessage, printNoAccess } from "./messages";
import { askForAction, askForCredentials } from "./questions";
import { handleGetPassword, handleSetPassword, hasAccess } from "./commands";

import dotenv from "dotenv";
import { MongoClient } from "mongodb";
dotenv.config();

const run = async () => {
  const url = process.env.MONGODB_URL;

  try {
    const client = await MongoClient.connect(url, {
      useUnifiedTopology: true,
    });
    console.log("Connected to DB!");

    const db = client.db("Rescue-steffen");

    await db.collection("inventory").insertOne({
      item: "canvas",
      qty: 100,
      tags: ["cotton"],
      size: { h: 28, w: 35.5, uom: "cm" },
    });

    client.close();
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
