import { socket } from ".";

export function handleRooms(setRooms, setSelected) {
  socket.on("handleRooms", (rooms) => {
    setRooms(rooms);
    setSelected();
  });
  socket.emit("getRooms");
}
export function unhandleRooms() {
  socket.removeListener("handleRooms");
}

export function handleScores(setScores) {
  socket.on("handleScores", (scores) => {
    setScores(scores);
  });
  socket.emit("getScores");
}
export function unhandleScores() {
  socket.removeAllListeners("handleScores");
}

export function handleCreation(setErrors) {
  socket.on("handleCreation", ({ errors }) => {
    setErrors(errors);
  });
}
export function unhandleCreation() {
  socket.removeAllListeners("handleCreation");
}
export function createRoom(data) {
  socket.emit("createRoom", data);
}

export function handleJoining(setErrors) {
  socket.on("handleJoining", ({ errors }) => {
    setErrors(errors);
  });
}
export function unhandleJoining() {
  socket.removeAllListeners("handleJoining");
}
export function joinRoom(data) {
  socket.emit("joinRoom", data);
}
