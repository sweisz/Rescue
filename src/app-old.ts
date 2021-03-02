import prompts from "prompts";
import chalk from "chalk";
import { stringify } from "querystring";

// chalk color definition
const warning = chalk.white.bgRed.bold;
const info = chalk.black.bgYellow.bold;
// display text
const greeting = warning(
  " WELCOME to " + info(" Steffens ") + " PassWordSafe "
);
const fail = "TRY AGAIN!";

export async function startPassManager() {
  const response = await prompts({
    type: "invisible",
    name: "name",
    message: "Enter password",
  });

  // function menu() {
  //   const response = prompts({
  //     type: "multiselect",
  //     name: "menu",
  //     message: "Please choose.",
  //     choices: [
  //       { title: "List Passwords", "" },
  //       { title: "New Password", value: "New Password" },
  //       { title: "Edit Password", value: "Edit Password" },
  //       { title: "Delete Password", value: "Delete Password" },
  //     ],
  //   });
  //   console.log(response);
  // }

  // function listPasswords() {
  //   console.log("Show your saved passwords.");
  // }

  var secret = response.value === "1234" ? greeting : fail;
  console.log(secret);
}
startPassManager();
