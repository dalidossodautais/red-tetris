import { assert } from "chai";
import Server from "../src/Server";
import log from "../src/utils/log";
import getNewPort from "./test_utils/getNewPort";

describe("Server", function () {
  it("Log on test", async function () {
    log("");
  });
  it("Start and stop without infos", async function () {
    const server = new Server();
    assert.containsAllKeys(server, ["host", "port"]);
    await server.start();
    assert.containsAllKeys(server, ["host", "globals", "port"]);
    await server.stop();
  });
  it("Start and stop with infos", async function () {
    const server = new Server("0.0.0.0", getNewPort());
    assert.containsAllKeys(server, ["host", "port"]);
    await server.start();
    assert.containsAllKeys(server, ["host", "globals", "port"]);
    await server.stop();
    assert.containsAllKeys(server, ["host", "port"]);
  });
  it("Stop without start", async function () {
    const server = new Server("0.0.0.0", getNewPort());
    await server.stop();
    assert.containsAllKeys(server, ["host", "port"]);
  });
  it("Double Start And Stop", async function () {
    const server = new Server("0.0.0.0", getNewPort());
    await server.start();
    await server.start();
    await server.stop();
    assert.containsAllKeys(server, ["host", "port"]);
  });
  it("Start and double stop", async function () {
    const server = new Server("0.0.0.0", getNewPort());
    await server.start();
    await server.stop();
    await server.stop();
    assert.containsAllKeys(server, ["host", "port"]);
  });
});
