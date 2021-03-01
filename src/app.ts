const [command]: string[] = process.argv.slice(2);

if (command === "set") {
  console.log("This is Setter");
} else if (command === "get") {
  console.log("This is Getter");
}
