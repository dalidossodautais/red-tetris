import Listeners from "../utils/Listeners";

export default function Viewer(globals, socket) {
  this.globals = globals;
  this.socket = socket;
  this.listeners = new Listeners(socket, ["disconnect"]);
}

Viewer.prototype.disconnect = async function () {
  await this.globals.disconnectUser(this);
};

Viewer.prototype.join = async function () {
  this.listeners.on(this);
  await this.socket.join(this.socket.room.name);
};
Viewer.prototype.leave = async function () {
  this.listeners.off();
  await this.socket.leave(this.socket.room.name);
};
