import Listeners from "../utils/Listeners";

export default function Guest(globals, socket) {
  this.globals = globals;
  this.socket = socket;
  this.listeners = new Listeners(socket, [
    "disconnect",
    "getPath",
    "getRooms",
    "getScores",
    "getUsername",
    "saveUsername",
  ]);
}

Guest.prototype.disconnect = async function () {
  await this.globals.disconnectUser(this);
};

Guest.prototype.saveUsername = async function (username) {
  if (this.isNaming) {
    this.socket.emit("handleUsername", { error: "Already naming" });
    return false;
  }
  this.isNaming = true;
  if (this.globals.users.some((user) => user.socket.name === username)) {
    this.isNaming = false;
    this.socket.emit("handleUsername", { error: "Already used" });
    return false;
  }
  this.socket.name = username;
  await this.leave();
  const user = await this.globals.addUser(this.socket);
  this.globals.users.push(user);
  this.isNaming = false;
  this.socket.emit("handleUsername", { username });
  return user;
};

Guest.prototype.getUsername = async function () {
  this.socket.emit("handleUsername", { username: null });
};

Guest.prototype.sendPath = function (name, error) {
  this.socket.emit("handlePath", { error, name });
};
Guest.prototype.getPath = async function (pathname) {
  pathname = pathname.replace(/(^\/|\/$)/g, "");
  if (!this.socket.room && !pathname) return this.sendPath("/");
  const match = pathname.match(
    /^(\/?[+0-9A-Za-z_-]+)\[([+0-9A-Za-z_-]{3,20})\]$/
  );
  if (!match) return this.sendPath("/", "Invalid path");
  const [, roomName, username] = match;
  const user = await this.saveUsername(username);
  if (!user) return this.sendPath("/", "Username is already taken");
  const room = this.globals.rooms.find((room) => room.name === roomName);
  if (room) {
    if (room.type === "private") return this.sendPath("/", "Room is private");
    await this.globals.joinRoom(user, { name: roomName });
  } else if (
    await this.globals.createRoom(user, { name: roomName, type: "public" })
  )
    return this.sendPath("/", "Room name is invalid");
  return this.sendPath(pathname);
};

Guest.prototype.getRooms = async function () {
  this.socket.emit("handleRooms", this.globals.getRoomsClear());
};

Guest.prototype.getScores = async function () {
  this.socket.emit("handleScores", this.globals.scores);
};

Guest.prototype.join = async function () {
  this.listeners.on(this);
  await new Promise((resolve) => this.socket.join("", resolve));
};
Guest.prototype.leave = async function () {
  this.listeners.off();
  await new Promise((resolve) => this.socket.leave("", resolve));
};
