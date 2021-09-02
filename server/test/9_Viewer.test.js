import { assert } from "chai";
import Socket from "socket.io-client";
import Server from "../src/Server";
import statics from "../src/statics";
import Viewer from "../src/users/Viewer";
import getNewPort from "./test_utils/getNewPort";

const { host } = statics;

describe("Viewer", function () {
  let server, socket, url;
  before(async function () {
    const port = getNewPort();
    server = new Server(host, port);
    url = `http://${host}:${port}`;
    await server.start();
    socket = new Socket(url);
  });
  it("Create", function () {
    const viewer = new Viewer(server.globals, socket);
    assert.hasAllKeys(viewer, ["globals", "listeners", "socket"]);
  });
  after(async function () {
    socket.close();
    await server.stop();
  });
});
