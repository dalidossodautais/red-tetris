import Piece from "../Piece";
import Listeners from "../utils/Listeners";

export default function Player(globals, socket, options, pieceIndexes) {
  this.globals = globals;
  this.socket = socket;
  this.options = options;
  this.pieceIndexes = pieceIndexes;
  this.isPlaying = true;
  this.points = 0;
  this.grid = [];
  while (this.grid.length < this.options.height) {
    this.grid.unshift([]);
    while (this.grid[0].length < this.options.width) this.grid[0].push(null);
  }
  this.piece = null;
  this.pieceIndex = 0;
  this.next = [];
  for (this.pieceIndex = 0; this.pieceIndex < 3; ++this.pieceIndex)
    this.next.push(new Piece(this.pieceIndexes, this.pieceIndex));
  this.give();
  this.send();
  this.listeners = new Listeners(socket, ["disconnect", "playGame"]);
}

Player.prototype.disconnect = async function () {
  await this.globals.disconnectUser(this);
  if (this.isPlaying) {
    this.stop();
    this.socket.room.endGame();
  }
};

Player.prototype.addFullLinesForOthers = function (nbFullLines) {
  if (nbFullLines > 0)
    this.socket.room.players.forEach((player) => {
      if (player.isPlaying && player.socket.name !== this.socket.name)
        player.addFullLines(nbFullLines);
    });
};

Player.prototype.addFullLines = function (nbFullLines) {
  for (let y = 0; this.isPlaying && y < nbFullLines; y++) {
    this.grid.push([]);
    for (let x = 0; x < this.options.width; x++)
      this.grid[this.options.height].push("full");
    if (this.piece) this.down(1);
    if (this.grid.shift().some((cell) => cell)) {
      this.stop();
      this.socket.room.endGame();
    }
    this.send();
  }
};

Player.prototype.resetTimeout = function () {
  clearTimeout(this.timeout);
  this.timeout = setTimeout(() => {
    this.down();
    this.send();
  }, 1000 / this.options.gravity);
};

Player.prototype.send = function () {
  this.printable = [];
  for (let y = 0; y < this.options.height; y++) {
    this.printable.push([]);
    for (let x = 0; x < this.options.width; x++)
      this.printable[y].push(
        !this.options.invisibility ? this.grid[y][x] : null
      );
  }
  if (this.isPlaying) {
    let shadowY = 1;
    while (
      this.piece.coor[0].every(
        ({ x, y }) =>
          this.y + y + shadowY < this.options.height &&
          !this.printable[this.y + y + shadowY][this.x + x]
      )
    )
      ++shadowY;
    this.piece.coor[0].forEach(({ x, y }) => {
      this.printable[this.y + y + shadowY - 1][this.x + x] = "shadow";
    });
    this.piece.coor[0].forEach(({ x, y }) => {
      this.printable[this.y + y][this.x + x] = this.piece.name;
    });
  }
  this.globals.io
    .to(this.socket.room.name)
    .emit(`handleGame_${this.socket.name}`, {
      grid: this.printable,
      isPlaying: this.isPlaying,
      keeped: this.keeped ? this.keeped.getPrintable() : [],
      next: this.next.map((piece) => piece.getPrintable()),
      playerName: this.socket.name,
      points: this.points,
    });
};

Player.prototype.give = function (givenY) {
  this.next.push(new Piece(this.pieceIndexes, this.pieceIndex++));
  this.piece = this.next.shift();
  this.x = this.options.width / 2 - 2;
  this.y = givenY || 0;
  if (
    this.piece.coor[0].some(({ x, y }) => this.grid[this.y + y][this.x + x])
  ) {
    this.stop();
    this.socket.room.endGame();
    return false;
  }
  this.keepDone = false;
  return "given";
};

Player.prototype.down = function (givenY) {
  this.resetTimeout();
  if (
    this.piece.coor[0].every(
      ({ x, y }) =>
        this.y + y + 1 < this.options.height &&
        !this.grid[this.y + y + 1][this.x + x]
    )
  ) {
    this.y++;
    return true;
  }
  this.piece.coor[0].forEach(({ x, y }) => {
    this.grid[this.y + y][this.x + x] = this.piece.name;
  });
  this.grid = this.grid.filter((line) =>
    line.some((cell) => !cell || cell === "full")
  );
  const nbFullLines = this.options.height - this.grid.length;
  for (let y = 0; y < nbFullLines; y++) {
    this.grid.unshift([]);
    for (let x = 0; x < this.options.width; x++) this.grid[0].push(null);
  }
  this.points += this.piece.coor[0].length + nbFullLines ** 2 * 10;
  this.addFullLinesForOthers(nbFullLines - 1);
  return this.give(givenY);
};

Player.prototype.bottom = function () {
  let res;
  while ((res = this.down())) if (res === "given") return true;
  return false;
};

Player.prototype.left = function () {
  if (
    this.piece.coor[0].some(
      ({ x, y }) => x + this.x - 1 < 0 || this.grid[y + this.y][x + this.x - 1]
    )
  )
    return false;
  this.x--;
  return true;
};

Player.prototype.right = function () {
  if (
    this.piece.coor[0].some(
      ({ x, y }) =>
        x + this.x + 1 >= this.options.width ||
        this.grid[y + this.y][x + this.x + 1]
    )
  )
    return false;
  this.x++;
  return true;
};

Player.prototype.keep = function () {
  if (!this.socket.room.options.keep || this.keepDone) return false;
  if (!this.keeped) {
    this.keeped = this.piece;
    this.give();
    this.keepDone = true;
    return true;
  }
  const keeped = this.keeped;
  if (
    keeped.coor[0].some(
      ({ x, y }) =>
        this.y + y < 0 ||
        this.y + y >= this.height ||
        this.grid[y + this.y][x + this.x]
    )
  )
    return false;
  while (keeped.coor[0].some(({ x }) => this.x + x < 0)) this.right();
  while (keeped.coor[0].some(({ x }) => this.x + x >= this.options.width))
    this.left();
  this.keeped = this.piece;
  this.piece = keeped;
  this.keepDone = true;
  return true;
};

Player.prototype.rotate = function () {
  const rotated = this.piece.coor[
    (this.piece.coor.length + 1) % this.piece.coor.length
  ];
  while (rotated.some(({ x }) => this.x + x < 0)) this.right();
  while (rotated.some(({ x }) => this.x + x >= this.options.width)) this.left();
  if (
    rotated.some(
      ({ x, y }) =>
        this.y + y < 0 ||
        this.y + y >= this.height ||
        this.grid[y + this.y][x + this.x]
    )
  )
    return false;
  this.piece.rotate();
  return true;
};

Player.prototype.playGame = async function (data) {
  if (
    this.isPlaying &&
    ["bottom", "down", "keep", "left", "right", "rotate"].includes(data) &&
    this[data]()
  )
    this.send();
};

Player.prototype.stop = async function () {
  clearTimeout(this.timeout);
  this.isPlaying = false;
  this.send();
};

Player.prototype.join = async function () {
  this.listeners.on(this);
  await this.socket.join(this.socket.room.name);
};
Player.prototype.leave = async function () {
  this.listeners.off();
  await this.socket.leave(this.socket.room.name);
  await this.stop();
};
