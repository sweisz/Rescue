import http from "http";
import dotenv from "dotenv";
import { connectDB } from "./db";
import { handleGet, handlePost, handleDelete } from "./routes";

dotenv.config();

const port = process.env.PORT;
const url = process.env.MONGODB_URL;
// const passwordCollectionUrl = "/api/passwords";

connectDB(url, "Rescue-steffen");

const server = http.createServer(async (request, response) => {
  if (request.url === "/") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html");
    response.end(
      '<h1>RESCUE Password Manager.</h1><img src="https://http.cat/200" />'
    );
    return;
  }

  if (request.method === "POST") {
    handlePost(request, response);
    return;
  }
  // const parts = request.url.split("/");
  // const passwordName = parts[parts.length - 1];

  const parts = request.url.match(/\/api\/passwords\/(\w+)/);
  if (!parts) {
    response.statusCode = 400;
    response.end();
    return;
  }
  const [, passwordName] = parts;

  if (request.method === "GET") {
    handleGet(request, response, passwordName);
    return;
  }

  if (request.method === "DELETE") {
    handleDelete(request, response, passwordName);
  }

  response.statusCode = 405;
  response.end();
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port} 🪆`);
});
