import { readFile } from "fs";
import http from "http";
import socketIO from "socket.io";
import statics from "./statics";
import Guest from "./users/Guest";
import Globals from "./utils/Globals";
import log from "./utils/log";

export default function Server(host, port) {
  this.host = host || statics.host;
  this.port = port || statics.port;
  this.url = `http://${this.host}:${this.port}`;
}

function readFilePromise(file) {
  return new Promise((resolve, reject) =>
    readFile(`${__dirname}/../../client/${file}`, (err, data) => {
      if (err) reject(err);
      if (data) resolve(data);
    })
  );
}

async function handleRequest(req, res) {
  if (statics.env === "production")
    try {
      let file;
      switch (req.url) {
        case "/":
          file = await readFilePromise("index.html");
          break;
        case "/bundle.js":
          file = await readFilePromise("build/bundle.js");
          break;
        case "":
          await readFilePromise(req.url.replace(/\%PUBLIC_URL\%/, "public"));
      }
      res.end(file);
    } catch (e) {
      console.error(e);
    }
}

Server.prototype.start = async function () {
  if (!this.app) {
    log(`Launching ${statics.env} server on ${this.url}`);
    this.app = http.createServer(handleRequest);
    this.initIo();
    await new Promise((resolve) =>
      this.app.listen({ host: this.host, port: this.port }, resolve)
    );
    log(`Server is listening`);
  }
};

Server.prototype.stop = async function () {
  if (this.app) {
    await Promise.all([
      new Promise((resolve) => this.globals.io.close(resolve)),
      new Promise((resolve) => this.app.close(resolve)),
    ]);
    this.app = null;
  }
};

Server.prototype.initIo = function () {
  this.globals = new Globals(socketIO(this.app));
  this.globals.io.on("connection", async (socket) => {
    log("Connection by", socket.id);
    const guest = new Guest(this.globals, socket);
    await guest.join();
    socket.emit("handlePath", { name: "/" });
    socket.emit("handleUsername", { username: null });
  });
};
