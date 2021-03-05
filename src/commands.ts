import { printPassword, printPasswordSet } from "./messages";
import { askForPasswordValue } from "./questions";
import {
  createPasswordDoc,
  readPasswordDoc,
  updatePasswordDoc,
  updatePasswordValue,
} from "./db";

export const hasAccess = (masterPassword: string): boolean =>
  masterPassword === "1234";

export const handleSetPassword = async (
  passwordName: string
): Promise<void> => {
  const passwordValue = await askForPasswordValue();
  const passwordDoc = await readPasswordDoc(passwordName);
  if (passwordDoc) {
    console.log("Password already present. Changing existing value!");
    await updatePasswordValue(passwordName, passwordValue);
  } else {
    await createPasswordDoc({ name: passwordName, value: passwordValue });
  }
  printPasswordSet(passwordName);
};

export const handleGetPassword = async (
  passwordName: string
): Promise<void> => {
  // printPassword(passwordName, "FAKE-Pass-Hallo");
  const passwordDoc = await readPasswordDoc(passwordName);
  if (!passwordDoc) {
    console.log("No Password found");
    return;
  }

  printPassword(passwordDoc.name, passwordDoc.value);
};
