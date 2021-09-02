import { assert } from "chai";
import Socket from "socket.io-client";
import Server from "../src/Server";
import statics from "../src/statics";
import getNewPort from "./test_utils/getNewPort";

const { host } = statics;

describe("Guest", function () {
  let port, server, url;

  before(async function () {
    port = getNewPort();
    server = new Server(host, port);
    url = `http://${host}:${port}`;
    await server.start();
  });

  after(async function () {
    await server.stop();
  });

  let socket1, socket2;
  const name1 = "test1";
  const name2 = "test2";

  describe("Connect And Get", function () {
    it("First - Connect", async function () {
      socket1 = Socket(url);
      assert.deepInclude(socket1, { connected: false, disconnected: true });
    });
    it("First - Is Connected", async function () {
      if (!socket1.connected)
        await new Promise((resolve) => socket1.once("connect", resolve));
      assert.deepInclude(socket1, { connected: true, disconnected: false });
    });
    it("First - Get Rooms", async function () {
      const promise = new Promise((resolve) =>
        socket1.once("handleRooms", resolve)
      );
      socket1.emit("getRooms");
      assert.deepEqual(await promise, []);
    });
    it("First - Get Scores", async function () {
      const promise = new Promise((resolve) =>
        socket1.once("handleScores", resolve)
      );
      socket1.emit("getScores");
      assert.deepEqual(await promise, []);
    });
    it(`First - Get username`, async function () {
      const promise = new Promise((resolve) =>
        socket1.once("handleUsername", resolve)
      );
      socket1.emit("getUsername", name1);
      assert.deepEqual(await promise, { username: null });
    });
    it("First - Disconnect", async function () {
      await socket1.close();
    });
    it("First - Is Disconnected", async function () {
      if (!socket1.disconnected)
        await new Promise((resolve) => socket1.once("disconnect", resolve));
      assert.deepInclude(socket1, { connected: false, disconnected: true });
    });
  });

  describe("Set Username", function () {
    it("First - Connect", async function () {
      socket1 = Socket(url);
      assert.deepInclude(socket1, { connected: false, disconnected: true });
    });
    it("First - Is Connected", async function () {
      if (!socket1.connected)
        await new Promise((resolve) => socket1.once("connect", resolve));
      assert.deepInclude(socket1, { connected: true, disconnected: false });
    });
    it(`First - Save username [${name1}]`, async function () {
      const promise = new Promise((resolve) =>
        socket1.once("handleUsername", resolve)
      );
      socket1.emit("saveUsername", name1);
      assert.deepEqual(await promise, { username: name1 });
    });
    it("First - Disconnect", async function () {
      await socket1.close();
    });
    it("First - Is Disconnected", async function () {
      if (!socket1.disconnected)
        await new Promise((resolve) => socket1.once("disconnect", resolve));
      assert.deepInclude(socket1, { connected: false, disconnected: true });
    });
    it("First - Connect", async function () {
      socket1 = Socket(url);
      assert.deepInclude(socket1, { connected: false, disconnected: true });
    });
    it("First - Is Connected", async function () {
      if (!socket1.connected)
        await new Promise((resolve) => socket1.once("connect", resolve));
      assert.deepInclude(socket1, { connected: true, disconnected: false });
    });
    it(`First - Get username`, async function () {
      const promise = new Promise((resolve) =>
        socket1.once("handleUsername", resolve)
      );
      socket1.emit("getUsername", name1);
      assert.deepEqual(await promise, { username: null });
    });
    it(`First - Save username [${name1}]`, async function () {
      const promise = new Promise((resolve) =>
        socket1.once("handleUsername", resolve)
      );
      socket1.emit("saveUsername", name1);
      assert.deepEqual(await promise, { username: name1 });
    });
    it("Second - Connect", async function () {
      socket2 = Socket(url);
      assert.deepInclude(socket2, { connected: false, disconnected: true });
    });
    it("Second - Is Connected", async function () {
      if (!socket2.connected)
        await new Promise((resolve) => socket2.once("connect", resolve));
      assert.deepInclude(socket2, { connected: true, disconnected: false });
    });
    it(`Second - Save username [${name1}]`, async function () {
      const promise = new Promise((resolve) =>
        socket2.once("handleUsername", resolve)
      );
      socket2.emit("saveUsername", name1);
      assert.deepEqual(await promise, { error: "Already used" });
    });
    it(`Second - Save username [${name2}]`, async function () {
      const promise = new Promise((resolve) =>
        socket2.once("handleUsername", resolve)
      );
      socket2.emit("saveUsername", name2);
      assert.deepEqual(await promise, { username: name2 });
    });
    it("First - Disconnect", async function () {
      await socket1.close();
    });
    it("First - Is Disconnected", async function () {
      if (!socket1.disconnected)
        await new Promise((resolve) => socket1.once("disconnect", resolve));
      assert.deepInclude(socket1, { connected: false, disconnected: true });
    });
    it("Second - Disconnect", async function () {
      await socket2.close();
    });
    it("Second - Is Disconnected", async function () {
      if (!socket2.disconnected)
        await new Promise((resolve) => socket2.once("disconnect", resolve));
      assert.deepInclude(socket2, { connected: false, disconnected: true });
    });
  });

  describe("Try Path", function () {
    before(async function () {
      socket1 = Socket(url);
      socket2 = Socket(url);
      if (!socket1.connected)
        await new Promise((resolve) => socket1.once("connect", resolve));
      if (!socket2.connected)
        await new Promise((resolve) => socket2.once("connect", resolve));
      await new Promise((resolve) => socket1.once("handlePath", resolve));
      await new Promise((resolve) => socket2.once("handlePath", resolve));
    });
    after(async function () {
      socket1.close();
      socket2.close();
      if (!socket1.disconnected)
        await new Promise((resolve) => socket1.once("disconnect", resolve));
      if (!socket2.disconnected)
        await new Promise((resolve) => socket2.once("disconnect", resolve));
    });
    it(`First - "/wrong"`, async function () {
      const promise = new Promise((resolve) =>
        socket1.once("handlePath", resolve)
      );
      socket1.emit("getPath", "/wrong");
      assert.deepInclude(await promise, { error: "Invalid path", name: "/" });
    });
    it(`First - "/"`, async function () {
      const promise = new Promise((resolve) =>
        socket1.once("handlePath", resolve)
      );
      socket1.emit("getPath", "/");
      assert.deepEqual(await promise, { name: "/" });
    });
    it(`First - "/abc[def]"`, async function () {
      const promise1 = new Promise((resolve) =>
        socket1.once("handleUsername", resolve)
      );
      const promise2 = new Promise((resolve) =>
        socket1.once("handlePath", resolve)
      );
      socket1.emit("getPath", "/abc[def]");
      assert.deepEqual(await promise1, { username: "def" });
      assert.deepEqual(await promise2, { name: "abc[def]" });
    });
    it(`Second - "/abc[efg]"`, async function () {
      const promise1 = new Promise((resolve) =>
        socket2.once("handleUsername", resolve)
      );
      const promise2 = new Promise((resolve) =>
        socket2.once("handlePath", resolve)
      );
      socket2.emit("getPath", "/abc[efg]");
      assert.deepEqual(await promise1, { username: "efg" });
      assert.deepEqual(await promise2, { name: "abc[efg]" });
    });
  });
});
