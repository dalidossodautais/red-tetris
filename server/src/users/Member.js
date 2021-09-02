import Listeners from "../utils/Listeners";

export default function Member(globals, socket, type) {
  this.globals = globals;
  this.socket = socket;
  this.type = type;
  this.listeners = new Listeners(socket, [
    "disconnect",
    "getPath",
    "getRoom",
    "leaveRoom",
    // "sendMessage",
    "setMemberStatus",
  ]);
  this.listenersAdmin = new Listeners(socket, [
    "changeAdmin",
    "startGame",
    "updateOptions",
  ]);
}

Member.prototype.disconnect = async function () {
  await this.globals.disconnectUser(this);
};
Member.prototype.changeAdmin = function (username) {
  if (username !== this.socket.name) {
    const member = this.socket.room.members.find(
      (member) => member.socket.name === username
    );
    if (member) {
      this.setAdmin(false);
      member.setAdmin(true);
      this.socket.room.send();
    }
  }
};
Member.prototype.leaveRoom = async function () {
  await this.socket.room.removeMember(this.socket.name);
  await this.globals.addUser(this.socket);
  this.socket.emit("handlePath", { name: "/" });
};
// Member.prototype.sendMessage = function () {
//   this.socket.room.sendMessage({ content, username: this.socket.name });
// };
Member.prototype.setMemberStatus = function (status) {
  if (status !== this.type) {
    if (status === "viewer") {
      this.type = "viewer";
      this.socket.room.send();
    } else if (
      status === "player" &&
      this.socket.room.members.count((member) => member.type === "player") <
        this.socket.room.options.nbPlayersMax
    ) {
      this.type = "player";
      this.socket.room.send();
    }
  }
};
Member.prototype.startGame = function () {
  this.socket.room.startGame();
};
Member.prototype.updateOptions = function (options) {
  this.socket.room.updateOptions(options);
};
Member.prototype.getRoom = function (_, fn) {
  this.socket.emit("handleRoom", this.socket.room.get());
};

Member.prototype.setAdmin = function (isAdmin) {
  if (isAdmin && !this.isAdmin) {
    this.joinAdmin();
    this.isAdmin = true;
  } else if (!isAdmin && this.isAdmin) {
    this.leaveAdmin();
    delete this.isAdmin;
  }
};

Member.prototype.sendPath = function (name, error) {
  this.socket.emit("handlePath", { error, name });
};
Member.prototype.getPath = async function (pathname) {
  pathname = pathname.replace(/(^\/|\/$)/g, "");
  if (!pathname)
    return this.sendPath(
      `${this.socket.room.name}[${this.socket.name}]`,
      "You are already in a room"
    );
  const match = pathname.match(
    /^(\/?[+0-9A-Za-z_-]+)\[([+0-9A-Za-z_-]{3,20})\]$/
  );
  if (!match)
    return this.sendPath(
      `${this.socket.room.name}[${this.socket.name}]`,
      "Invalid path"
    );
  return this.sendPath(
    `${this.socket.room.name}[${this.socket.name}]`,
    "You are already in a room"
  );
};

Member.prototype.join = async function () {
  this.listeners.on(this);
  await new Promise((resolve) =>
    this.socket.join(this.socket.room.name, resolve)
  );
};
Member.prototype.leave = async function () {
  this.listeners.off();
  if (this.isAdmin) this.listenersAdmin.off();
  await new Promise((resolve) =>
    this.socket.leave(this.socket.room.name, resolve)
  );
};
Member.prototype.joinAdmin = function () {
  this.listenersAdmin.on(this);
};
Member.prototype.leaveAdmin = function () {
  this.listenersAdmin.off();
};
