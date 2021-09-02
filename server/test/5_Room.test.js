import { assert } from "chai";
import Room, { defaultOptions } from "../src/Room";
import Server from "../src/Server";
import getNewPort from "./test_utils/getNewPort";

describe("Room", function () {
  let server;
  before(async function () {
    server = new Server("0.0.0.0", getNewPort());
    await server.start();
  });
  let room;
  describe("Solo", function () {
    it("Create", function () {
      room = new Room(server.globals, "test_0", "solo");
      assert.deepInclude(room, {
        globals: server.globals,
        members: [],
        messages: [],
        name: "test_0",
        options: defaultOptions,
        players: [],
        type: "solo",
        viewers: [],
      });
    });
    it("Get", function () {
      const roomData = room.get();
      assert.deepEqual(roomData, {
        isRunning: false,
        members: [],
        name: "test_0",
        options: defaultOptions,
        playerNames: [],
        type: "solo",
      });
    });
    it("Get Summary", function () {
      const roomData = room.getSummary();
      assert.deepEqual(roomData, {
        name: "test_0",
        nbPlayers: 0,
        nbViewers: 0,
        options: defaultOptions,
        type: "solo",
      });
    });
    it("Start Game", function () {
      room.startGame();
      const roomData = room.get();
      assert.deepEqual(roomData, {
        isRunning: false,
        members: [],
        name: "test_0",
        options: defaultOptions,
        playerNames: [],
        type: "solo",
      });
    });
    it("End Game", function () {
      room.endGame();
      const roomData = room.get();
      assert.deepEqual(roomData, {
        isRunning: false,
        members: [],
        name: "test_0",
        options: defaultOptions,
        playerNames: [],
        type: "solo",
      });
    });
  });
  after(async function () {
    await server.stop();
  });
});
