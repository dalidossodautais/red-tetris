import { socket } from ".";

export function handleRoom(setRoom, username) {
  socket.on("handleRoom", (room) => {
    if (room.members) {
      const me = room.members.find((member) => member.name === username);
      room.isAdmin = me.isAdmin;
      room.isPlayer = me.type === "player";
    }
    if (room.playerNames) {
      const index = room.playerNames.findIndex(
        (playerName) => playerName === username
      );
      if (index !== -1) {
        room.playerNames.splice(index, 1);
        room.playerNames.unshift(username);
      }
    }
    setRoom(room);
  });
  socket.emit("getRoom");
}
export function unhandleRoom() {
  socket.removeAllListeners("handleRoom");
}

export function handleGames(setGame, playerNames) {
  playerNames.forEach((playerName) => {
    socket.on(`handleGame_${playerName}`, (game) => setGame(game, playerName));
    socket.emit(`getGame_${playerName}`, null, (game) =>
      setGame(game, playerName)
    );
  });
}
export function unhandleGames(playerNames) {
  playerNames.forEach((playerName) => {
    socket.removeAllListeners(`handleGame_${playerName}`);
  });
}

export function updateOptions(options) {
  socket.emit("updateOptions", options);
}
export function leaveRoom() {
  socket.emit("leaveRoom");
}
export function startGame() {
  socket.emit("startGame");
}

export function changeAdmin(username) {
  socket.emit("changeAdmin", username);
}
export function setMemberStatus(type) {
  socket.emit("setMemberStatus", type);
}

export function playGame(action) {
  socket.emit("playGame", action);
}
