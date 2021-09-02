import { reconnect, socket } from "../../src/middleware/index";

describe("Socket", () => {
  test("Try reconnection", () => {
    socket.close();
    reconnect();
  });
});
