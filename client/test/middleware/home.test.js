import {
  createRoom,
  handleCreation,
  handleJoining,
  handleRooms,
  handleScores,
  joinRoom,
  unhandleCreation,
  unhandleJoining,
  unhandleRooms,
  unhandleScores,
} from "../../src/middleware/home";

describe("Socket", () => {
  test("Home", () => {
    handleRooms();
    unhandleRooms();
    handleScores();
    unhandleScores();
    handleCreation();
    unhandleCreation();
    createRoom();
    handleJoining();
    unhandleJoining();
    joinRoom();
  });
});
