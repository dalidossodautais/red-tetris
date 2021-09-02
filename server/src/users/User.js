import Listeners from "../utils/Listeners";

export default function User(globals, socket) {
  this.globals = globals;
  this.socket = socket;
  this.listeners = new Listeners(socket, [
    "createRoom",
    "disconnect",
    "getPath",
    "getRooms",
    "getScores",
    "joinRoom",
  ]);
}

User.prototype.disconnect = async function () {
  await this.globals.disconnectUser(this);
};

User.prototype.createRoom = async function (room) {
  const errors = await this.globals.createRoom(this, room);
  if (errors) this.socket.emit("handleCreation", { errors });
  else
    this.socket.emit("handlePath", {
      name: `${this.socket.room.name}[${this.socket.name}]`,
    });
};

User.prototype.joinRoom = async function (room) {
  const errors = await this.globals.joinRoom(this, room);
  if (errors) this.socket.emit("handleJoining", { errors });
  else
    this.socket.emit("handlePath", {
      name: `${this.socket.room.name}[${this.socket.name}]`,
    });
};

User.prototype.getRooms = async function () {
  this.socket.emit("handleRooms", this.globals.getRoomsClear());
};

User.prototype.getScores = async function () {
  this.socket.emit("handleScores", this.globals.scores);
};

User.prototype.sendPath = function (name, error) {
  this.socket.emit("handlePath", { error, name });
};
User.prototype.getPath = async function (pathname) {
  pathname = pathname.replace(/(^\/|\/$)/g, "");
  if (!pathname) return this.sendPath("/");
  const match = pathname.match(
    /^(\/?[+0-9A-Za-z_-]+)\[([+0-9A-Za-z_-]{3,20})\]$/
  );
  if (!match) return this.sendPath("/", "Invalid path");
  const [, roomName, username] = match;
  if (this.socket.name !== username) return this.sendPath("/", "Not your name");
  const room = this.globals.rooms.find((room) => room.name === roomName);
  if (room) {
    if (room.type === "private") return this.sendPath("/", "Room is private");
    await this.globals.joinRoom(this, { name: roomName });
  } else if (
    await this.globals.createRoom(this, { name: roomName, type: "public" })
  )
    return this.sendPath("/", "Room name is invalid");
  return this.sendPath(pathname);
};

User.prototype.join = async function () {
  this.listeners.on(this);
  await new Promise((resolve) => this.socket.join("", resolve));
};

User.prototype.leave = async function () {
  this.listeners.off();
  await new Promise((resolve) => this.socket.leave("", resolve));
};
