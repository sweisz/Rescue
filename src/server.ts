import http from "http";
import dotenv from "dotenv";
import { connectDB, deletePasswordDoc, readPasswordDoc } from "./db";

dotenv.config();

const port = process.env.PORT;
const url = process.env.MONGODB_URL;

connectDB(url, "Rescue-steffen");

const server = http.createServer(async (request, response) => {
  if (request.url === "/") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html");
    response.end("<h1>Rescue me!</h1>");
    return;
  }
  const parts = request.url.split("/");
  const passwordName = parts[parts.length - 1];

  if (request.method === "GET") {
    const passwordDoc = await readPasswordDoc(passwordName);
    if (!passwordDoc) {
      response.statusCode = 404;
      response.end();
      return;
    }
    response.statusCode = 200;
    response.setHeader("Content-Type", "application/json");
    response.end(JSON.stringify(passwordDoc));
    return;
  }

  if (request.method === "DELETE") {
    const deletedPassword = await deletePasswordDoc(passwordName);
    console.log(deletedPassword);
    if (deletedPassword) {
      response.statusCode = 200;
      response.end();
      return;
    } else {
      response.statusCode = 404;
      response.end();
      return;
    }
  }
  if (request.method === "PATCH") {
    // TODO
  }

  response.end();
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port} 🪆`);
});
