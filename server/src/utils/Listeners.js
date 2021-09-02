export default function Listeners(socket, listeners) {
  this.socket = socket;
  this.listeners = listeners;
  this.fns = [];
}

Listeners.prototype.on = function (thisGot) {
  this.listeners.forEach((listener) => {
    const fn = (...data) => thisGot[listener](...data);
    this.fns.push(fn);
    this.socket.on(listener, fn);
  });
};

Listeners.prototype.off = function () {
  if (this.fns.length) {
    this.listeners.forEach((listener, index) => {
      this.socket.off(listener, this.fns[index]);
    });
    this.fns = [];
  }
};
