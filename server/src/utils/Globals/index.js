import User from "../../users/User";
import log from "../log";
import "./methodsRooms";

export function removeIt(array, filter) {
  const index = array.findIndex(filter);
  if (index !== -1) array.splice(index, 1);
}

export default function Globals(io) {
  this.io = io;
  this.rooms = [];
  this.scores = [];
  this.users = [];
}

Globals.prototype.addScore = function (score) {
  let i = 0;
  while (this.scores[i] && this.scores[i].points > score.points) ++i;
  this.scores.splice(i, 0, score);
  this.io.to("").emit("scores", this.scores);
};

Globals.prototype.addUser = async function (socket) {
  socket.room = null;
  const user = new User(this, socket);
  await user.join();
  return user;
};
Globals.prototype.disconnectUser = async function (thisUser) {
  await thisUser.leave();
  const socket = thisUser.socket;
  this.removeUser(socket.name);
  if (socket.room) await socket.room.removeMember(socket.name);
  if (socket.name) log("Disconnection by", socket.id, "named", socket.name);
  else log("Disconnection by", socket.id, "not named");
};
Globals.prototype.removeUser = async function (name) {
  removeIt(this.users, (user) => user.socket.name === name);
};
