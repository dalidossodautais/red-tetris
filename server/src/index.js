import "dotenv/config";
import "./utils/prototypes";
import Server from "./Server";

if (!process.env.NODE_ENV) {
  console.error("Select an environment");
  process.exit(1);
}

const server = new Server();

server.start();
