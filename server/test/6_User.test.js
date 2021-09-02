import { assert } from "chai";
import { defaultOptions } from "../src/Room";
import Server from "../src/Server";
import statics from "../src/statics";
import connectAndName from "./test_utils/connectAndName";
import getNewPort from "./test_utils/getNewPort";

const { host } = statics;

describe("User", function () {
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

  describe("Room Creation And Joining", async function () {
    let sockets, savedRooms;

    before(async function () {
      const promises = [];
      for (let i = 0; i < 6; i++)
        promises.push(connectAndName(url, `name_${i}`));
      sockets = await Promise.all(promises);
      sockets[5].on("handleRooms", (rooms) => {
        savedRooms = rooms;
      });
    });

    after(function () {
      sockets.forEach((socket) => socket.close());
    });

    describe("Standard", async function () {
      it("Create Public Room [one] - First User", async function () {
        const promise = new Promise((resolve) =>
          sockets[0].once("handlePath", resolve)
        );
        sockets[0].emit("createRoom", { name: "one", type: "public" });
        assert.deepEqual(await promise, { name: "one[name_0]" });
      });

      it("Get Rooms - Second User", async function () {
        const promise = new Promise((resolve) =>
          sockets[1].once("handleRooms", resolve)
        );
        sockets[1].emit("getRooms");
        assert.deepEqual(await promise, [
          {
            name: "one",
            nbPlayers: 1,
            nbViewers: 0,
            options: defaultOptions,
            type: "public",
          },
        ]);
      });

      it("Handle Rooms - Sixth User", async function () {
        assert.deepEqual(savedRooms, [
          {
            name: "one",
            nbPlayers: 1,
            nbViewers: 0,
            options: defaultOptions,
            type: "public",
          },
        ]);
      });

      it("Get Scores - Third User", async function () {
        const promise = new Promise((resolve) =>
          sockets[1].once("handleScores", resolve)
        );
        sockets[1].emit("getScores");
        assert.deepEqual(await promise, []);
      });

      it("Create Public Room [one] - Second User", async function () {
        const promise = new Promise((resolve) =>
          sockets[1].once("handleCreation", resolve)
        );
        sockets[1].emit("createRoom", { name: "one", type: "public" });
        assert.deepEqual(await promise, { errors: { name: "Already taken" } });
      });

      it("Get Rooms - Second User", async function () {
        const promise = new Promise((resolve) =>
          sockets[1].once("handleRooms", resolve)
        );
        sockets[1].emit("getRooms");
        assert.deepEqual(await promise, [
          {
            name: "one",
            nbPlayers: 1,
            nbViewers: 0,
            options: defaultOptions,
            type: "public",
          },
        ]);
      });

      it("Get Rooms - Third User", async function () {
        const promise = new Promise((resolve) =>
          sockets[2].once("handleRooms", resolve)
        );
        sockets[2].emit("getRooms");
        assert.deepEqual(await promise, [
          {
            name: "one",
            nbPlayers: 1,
            nbViewers: 0,
            options: defaultOptions,
            type: "public",
          },
        ]);
      });

      it("Leave Public Room [one] - First User", async function () {
        const promise = new Promise((resolve) =>
          sockets[0].once("handlePath", resolve)
        );
        sockets[0].emit("leaveRoom");
        assert.deepEqual(await promise, { name: "/" });
      });

      it("Create Public Room [one] - Second User", async function () {
        const promise = new Promise((resolve) =>
          sockets[1].once("handlePath", resolve)
        );
        sockets[1].emit("createRoom", { name: "one", type: "public" });
        assert.deepEqual(await promise, { name: "one[name_1]" });
      });

      it("Join Public Room [one] - Third User", async function () {
        const promise = new Promise((resolve) =>
          sockets[2].once("handlePath", resolve)
        );
        sockets[2].emit("joinRoom", { name: "one" });
        assert.deepEqual(await promise, { name: "one[name_2]" });
      });

      it("Create Private Room [one] - First User", async function () {
        const promise = new Promise((resolve) =>
          sockets[0].once("handleCreation", resolve)
        );
        sockets[0].emit("createRoom", {
          name: "one",
          password: "right",
          type: "private",
        });
        assert.deepEqual(await promise, { errors: { name: "Already taken" } });
      });

      it("Create Private Room [two] - First User", async function () {
        const promise = new Promise((resolve) =>
          sockets[0].once("handlePath", resolve)
        );
        sockets[0].emit("createRoom", {
          name: "two",
          password: "right",
          type: "private",
        });
        assert.deepEqual(await promise, { name: "two[name_0]" });
      });

      it("Join Private Room [two] with wrong password - Fourth User", async function () {
        const promise = new Promise((resolve) =>
          sockets[3].once("handleJoining", resolve)
        );
        sockets[3].emit("joinRoom", {
          name: "two",
          password: "wrong",
          type: "private",
        });
        assert.deepEqual(await promise, {
          errors: { password: "Wrong password" },
        });
      });

      it("Join Private Room [two] with right password - Fourth User", async function () {
        const promise = new Promise((resolve) =>
          sockets[3].once("handlePath", resolve)
        );
        sockets[3].emit("joinRoom", {
          name: "two",
          password: "right",
          type: "private",
        });
        assert.deepEqual(await promise, { name: "two[name_3]" });
      });

      it("Get Scores - Fifth User", async function () {
        const promise = new Promise((resolve) =>
          sockets[4].once("handleScores", resolve)
        );
        sockets[4].emit("getScores");
        assert.deepEqual(await promise, []);
      });

      it("Get Rooms - Fifth User", async function () {
        const promise = new Promise((resolve) =>
          sockets[4].once("handleRooms", resolve)
        );
        sockets[4].emit("getRooms");
        assert.deepEqual(await promise, [
          {
            name: "two",
            nbPlayers: 2,
            nbViewers: 0,
            options: defaultOptions,
            type: "private",
          },
          {
            name: "one",
            nbPlayers: 2,
            nbViewers: 0,
            options: defaultOptions,
            type: "public",
          },
        ]);
      });

      it("Leave Private Room [two] - First User", async function () {
        const promise = new Promise((resolve) =>
          sockets[0].once("handlePath", resolve)
        );
        sockets[0].emit("leaveRoom");
        assert.deepEqual(await promise, { name: "/" });
      });

      it("Leave Private Room [one] - Second User", async function () {
        const promise = new Promise((resolve) =>
          sockets[1].once("handlePath", resolve)
        );
        sockets[1].emit("leaveRoom");
        assert.deepEqual(await promise, { name: "/" });
      });
    });

    describe("Path", async function () {
      it(`Try Path "/" - First User`, async function () {
        const promise = new Promise((resolve) =>
          sockets[0].on("handlePath", resolve)
        );
        sockets[0].emit("getPath", "/");
        assert.deepEqual(await promise, { name: "/" });
      });

      it(`Try Path "/abc[def]" - First User`, async function () {
        const promise = new Promise((resolve) =>
          sockets[0].on("handlePath", resolve)
        );
        sockets[0].emit("getPath", "/abc[def]");
        assert.deepEqual(await promise, { error: "Not your name", name: "/" });
      });

      it(`Try Path "/abc[name_0]" - First User`, async function () {
        const promise = new Promise((resolve) =>
          sockets[0].on("handlePath", resolve)
        );
        sockets[0].emit("getPath", "/abc[name_0]");
        assert.deepEqual(await promise, { name: "abc[name_0]" });
      });

      it(`Try Path "/abc[name_1]" - Second User`, async function () {
        const promise = new Promise((resolve) =>
          sockets[1].on("handlePath", resolve)
        );
        sockets[1].emit("getPath", "/abc[name_1]");
        assert.deepEqual(await promise, { name: "abc[name_1]" });
      });
    });
  });
});
