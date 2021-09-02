import {
  changeAdmin,
  handleGames,
  handleRoom,
  leaveRoom,
  playGame,
  setMemberStatus,
  startGame,
  unhandleGames,
  unhandleRoom,
  updateOptions,
} from "../../src/middleware/room";

describe("Socket", () => {
  test("Room", () => {
    changeAdmin();
    handleGames(null, ["test"]);
    handleRoom();
    leaveRoom();
    playGame();
    setMemberStatus();
    startGame();
    updateOptions();
    unhandleGames(["test"]);
    unhandleRoom();
  });
});
