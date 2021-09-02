import { assert } from "chai";
import { defaultOptions } from "../src/Room";
import Server from "../src/Server";
import statics from "../src/statics";
import connectAndName from "./test_utils/connectAndName";
import getNewPort from "./test_utils/getNewPort";
import socketTimeout from "./test_utils/socketTimeout";

const { host } = statics;

describe("Member", function () {
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
  let sockets, savedRoom, savedRooms;

  before(async function () {
    let promises = [];
    for (let i = 0; i < 6; i++) promises.push(connectAndName(url, `name_${i}`));
    sockets = await Promise.all(promises);
    sockets[0].on("handleRoom", (room) => {
      savedRoom = room;
    });
    sockets[5].on("handleRooms", (rooms) => {
      savedRooms = rooms;
    });
    const promise = new Promise((resolve) =>
      sockets[0].once("handlePath", resolve)
    );
    sockets[0].emit("createRoom", { name: "one", type: "public" });
    await promise;
    promises = [];
    for (let i = 1; i < 5; i++) {
      promises.push(
        new Promise((resolve) => sockets[i].once("handlePath", resolve))
      );
      sockets[i].emit("joinRoom", { name: "one" });
    }
    await Promise.all(promises);
  });

  after(function () {
    sockets.forEach((socket) => socket.close());
  });

  it("Handle Rooms - Sixth User", async function () {
    assert.deepEqual(savedRooms, [
      {
        name: "one",
        nbPlayers: 4,
        nbViewers: 1,
        options: defaultOptions,
        type: "public",
      },
    ]);
  });

  it("Handle Room - First User", async function () {
    assert.deepEqual(savedRoom, {
      isRunning: false,
      members: [
        { isAdmin: true, name: "name_0", type: "player" },
        { name: "name_1", type: "player" },
        { name: "name_2", type: "player" },
        { name: "name_3", type: "player" },
        { name: "name_4", type: "viewer" },
      ],
      name: "one",
      options: defaultOptions,
      playerNames: [],
      type: "public",
    });
  });

  it("Get Room - First User", async function () {
    const promise = new Promise((resolve) => {
      sockets[0].once("handleRoom", resolve);
    });
    sockets[0].emit("getRoom");
    assert.deepEqual(await promise, {
      isRunning: false,
      members: [
        { isAdmin: true, name: "name_0", type: "player" },
        { name: "name_1", type: "player" },
        { name: "name_2", type: "player" },
        { name: "name_3", type: "player" },
        { name: "name_4", type: "viewer" },
      ],
      name: "one",
      options: defaultOptions,
      playerNames: [],
      type: "public",
    });
  });

  describe("Change Admin", () => {
    it("[name_1] - First User", async function () {
      const promise = new Promise((resolve) => {
        sockets[0].once("handleRoom", resolve);
      });
      sockets[0].emit("changeAdmin", "name_1");
      assert.deepEqual(await promise, {
        isRunning: false,
        members: [
          { name: "name_0", type: "player" },
          { isAdmin: true, name: "name_1", type: "player" },
          { name: "name_2", type: "player" },
          { name: "name_3", type: "player" },
          { name: "name_4", type: "viewer" },
        ],
        name: "one",
        options: defaultOptions,
        playerNames: [],
        type: "public",
      });
    });

    it("[name_4] - Second User", async function () {
      const promise = new Promise((resolve) => {
        sockets[1].once("handleRoom", resolve);
      });
      sockets[1].emit("changeAdmin", "name_4");
      assert.deepEqual(await promise, {
        isRunning: false,
        members: [
          { name: "name_0", type: "player" },
          { name: "name_1", type: "player" },
          { name: "name_2", type: "player" },
          { name: "name_3", type: "player" },
          { isAdmin: true, name: "name_4", type: "viewer" },
        ],
        name: "one",
        options: defaultOptions,
        playerNames: [],
        type: "public",
      });
    });

    it("[name_0] - First User", async function () {
      const promise = new Promise((resolve) => {
        sockets[0].once("handleRoom", () => resolve(true));
        setTimeout(() => resolve(false), socketTimeout);
      });
      sockets[0].emit("changeAdmin", "name_0");
      assert.deepEqual(await promise, false);
    });

    it("[name_0] - Fifth User", async function () {
      const promise = new Promise((resolve) => {
        sockets[4].once("handleRoom", resolve);
      });
      sockets[4].emit("changeAdmin", "name_0");
      assert.deepEqual(await promise, {
        isRunning: false,
        members: [
          { isAdmin: true, name: "name_0", type: "player" },
          { name: "name_1", type: "player" },
          { name: "name_2", type: "player" },
          { name: "name_3", type: "player" },
          { name: "name_4", type: "viewer" },
        ],
        name: "one",
        options: defaultOptions,
        playerNames: [],
        type: "public",
      });
    });

    it("[name_0] - First User", async function () {
      const promise = new Promise((resolve) => {
        sockets[0].once("handleRoom", () => resolve(true));
        setTimeout(() => resolve(false), socketTimeout);
      });
      sockets[0].emit("changeAdmin", "name_0");
      assert.deepEqual(await promise, false);
    });
  });

  describe("Set Member Status", () => {
    it("[wrong] - First User", async function () {
      const promise = new Promise((resolve) => {
        sockets[0].once("handleRoom", () => resolve(true));
        setTimeout(() => resolve(false), socketTimeout);
      });
      sockets[0].emit("setMemberStatus", "wrong");
      assert.deepEqual(await promise, false);
    });

    it("[player] - Fifth User", async function () {
      const promise = new Promise((resolve) => {
        sockets[4].once("handleRoom", () => resolve(true));
        setTimeout(() => resolve(false), socketTimeout);
      });
      sockets[4].emit("setMemberStatus", "player");
      assert.deepEqual(await promise, false);
    });

    it("[viewer] - First User", async function () {
      const promise = new Promise((resolve) => {
        sockets[0].once("handleRoom", resolve);
      });
      sockets[0].emit("setMemberStatus", "viewer");
      assert.deepEqual(await promise, {
        isRunning: false,
        members: [
          { isAdmin: true, name: "name_0", type: "viewer" },
          { name: "name_1", type: "player" },
          { name: "name_2", type: "player" },
          { name: "name_3", type: "player" },
          { name: "name_4", type: "viewer" },
        ],
        name: "one",
        options: defaultOptions,
        playerNames: [],
        type: "public",
      });
    });

    it("[player] - Fifth User", async function () {
      const promise = new Promise((resolve) => {
        sockets[4].once("handleRoom", resolve);
      });
      sockets[4].emit("setMemberStatus", "player");
      assert.deepEqual(await promise, {
        isRunning: false,
        members: [
          { isAdmin: true, name: "name_0", type: "viewer" },
          { name: "name_1", type: "player" },
          { name: "name_2", type: "player" },
          { name: "name_3", type: "player" },
          { name: "name_4", type: "player" },
        ],
        name: "one",
        options: defaultOptions,
        playerNames: [],
        type: "public",
      });
    });

    it("[player] - Fifth User", async function () {
      const promise = new Promise((resolve) => {
        sockets[4].once("handleRoom", () => resolve(true));
        setTimeout(() => resolve(false), socketTimeout);
      });
      sockets[4].emit("setMemberStatus", "player");
      assert.deepEqual(await promise, false);
    });
  });

  describe("Update Options", () => {
    it("First User - No changes", async function () {
      const promise = new Promise((resolve) => {
        sockets[0].once("handleRoom", () => resolve(true));
        setTimeout(() => resolve(false), socketTimeout);
      });
      sockets[0].emit("updateOptions", {});
      assert.deepEqual(await promise, false);
    });

    it("First User - { keep: false }", async function () {
      const promise = new Promise((resolve) => {
        sockets[0].once("handleRoom", resolve);
      });
      sockets[0].emit("updateOptions", { keep: false });
      assert.deepEqual(await promise, {
        options: { ...defaultOptions, keep: false },
      });
    });

    it("First User - { keep: false }", async function () {
      const promise = new Promise((resolve) => {
        sockets[0].once("handleRoom", () => resolve(true));
        setTimeout(() => resolve(false), socketTimeout);
      });
      sockets[0].emit("updateOptions", { keep: false });
      assert.deepEqual(await promise, false);
    });

    it("First User - { keep: true }", async function () {
      const promise = new Promise((resolve) => {
        sockets[0].once("handleRoom", resolve);
      });
      sockets[0].emit("updateOptions", { keep: true });
      assert.deepEqual(await promise, { options: defaultOptions });
    });
  });

  describe("Get Path", function () {
    it(`First - Get Path "/wrong"`, async function () {
      const promise = new Promise((resolve) =>
        sockets[0].once("handlePath", resolve)
      );
      sockets[0].emit("getPath", "/wrong");
      assert.deepInclude(await promise, {
        error: "Invalid path",
        name: "one[name_0]",
      });
    });
    it(`First - Get Path "/"`, async function () {
      const promise = new Promise((resolve) =>
        sockets[0].once("handlePath", resolve)
      );
      sockets[0].emit("getPath", "/");
      assert.deepInclude(await promise, {
        error: "You are already in a room",
        name: "one[name_0]",
      });
    });
    it(`First - Get Path "/abc[def]"`, async function () {
      const promise = new Promise((resolve) =>
        sockets[0].once("handlePath", resolve)
      );
      sockets[0].emit("getPath", "/abc[def]");
      assert.deepInclude(await promise, {
        error: "You are already in a room",
        name: "one[name_0]",
      });
    });
  });

  describe("Start Game", () => {
    it("Second User", async function () {
      const promise = new Promise((resolve) => {
        sockets[1].once("handleRoom", () => resolve(true));
        setTimeout(() => resolve(false), socketTimeout);
      });
      sockets[1].emit("startGame", {});
      assert.deepEqual(await promise, false);
    });

    it("First User", async function () {
      const promise = new Promise((resolve) => {
        sockets[0].once("handleRoom", resolve);
      });
      sockets[0].emit("startGame", {});
      assert.deepEqual(await promise, {
        isRunning: true,
        playerNames: ["name_1", "name_2", "name_3", "name_4"],
      });
    });
  });

  describe("Disconnect", () => {
    it("First User", async function () {
      const outPromise = new Promise((resolve) => {
        sockets[5].once("handleRooms", resolve);
      });
      const inPromise = new Promise((resolve) => {
        sockets[4].once("handleRoom", resolve);
      });
      sockets[0].close();
      assert.deepEqual(await outPromise, [
        {
          name: "one",
          nbPlayers: 4,
          nbViewers: 0,
          options: defaultOptions,
          type: "public",
        },
      ]);
      assert.deepEqual(await inPromise, {
        members: [
          { isAdmin: true, name: "name_1", type: "player" },
          { name: "name_2", type: "player" },
          { name: "name_3", type: "player" },
          { name: "name_4", type: "player" },
        ],
      });
    });

    it("Third User", async function () {
      const outPromise = new Promise((resolve) => {
        sockets[5].once("handleRooms", resolve);
      });
      const inPromise = new Promise((resolve) => {
        sockets[4].once("handleRoom", resolve);
      });
      sockets[2].close();
      assert.deepEqual(await outPromise, [
        {
          name: "one",
          nbPlayers: 3,
          nbViewers: 0,
          options: defaultOptions,
          type: "public",
        },
      ]);
      assert.deepEqual(await inPromise, {
        members: [
          { isAdmin: true, name: "name_1", type: "player" },
          { name: "name_3", type: "player" },
          { name: "name_4", type: "player" },
        ],
      });
    });

    it("Second User", async function () {
      const outPromise = new Promise((resolve) => {
        sockets[5].once("handleRooms", resolve);
      });
      const inPromise = new Promise((resolve) => {
        sockets[4].once("handleRoom", resolve);
      });
      sockets[1].close();
      assert.deepEqual(await outPromise, [
        {
          name: "one",
          nbPlayers: 2,
          nbViewers: 0,
          options: defaultOptions,
          type: "public",
        },
      ]);
      assert.deepEqual(await inPromise, {
        members: [
          { isAdmin: true, name: "name_3", type: "player" },
          { name: "name_4", type: "player" },
        ],
      });
    });

    it("Fifth User", async function () {
      const outPromise = new Promise((resolve) => {
        sockets[5].once("handleRooms", resolve);
      });
      const inPromise = new Promise((resolve) => {
        sockets[3].once("handleRoom", resolve);
      });
      sockets[4].close();
      assert.deepEqual(await outPromise, [
        {
          name: "one",
          nbPlayers: 1,
          nbViewers: 0,
          options: defaultOptions,
          type: "public",
        },
      ]);
      assert.deepEqual(await inPromise, {
        members: [{ isAdmin: true, name: "name_3", type: "player" }],
      });
    });

    it("Fourth User", async function () {
      const outPromise = new Promise((resolve) => {
        sockets[5].once("handleRooms", resolve);
      });
      sockets[3].close();
      assert.deepEqual(await outPromise, []);
    });
  });
});
