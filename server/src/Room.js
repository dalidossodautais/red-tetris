import Member from "./users/Member";
import Player from "./users/Player";
import Viewer from "./users/Viewer";
import log from "./utils/log";

export const defaultOptions = {
  gravity: 1,
  height: 20,
  invisibility: false,
  keep: true,
  nbPlayersMax: 4,
  width: 10,
};

function getMembers(members) {
  return members.map((member) => ({
    isAdmin: member.isAdmin,
    name: member.socket.name,
    type: member.type,
  }));
}

export default function Room(globals, name, type, password) {
  this.globals = globals;
  this.name = name;
  this.type = type;
  if (password) this.password = password;
  this.members = [];
  this.messages = [];
  this.options = defaultOptions;
  this.players = [];
  this.viewers = [];
  log(`Room ${name} created`);
}

Room.prototype.get = function () {
  return {
    isRunning: this.players.some((player) => player.isPlaying),
    members: getMembers(this.members),
    name: this.name,
    options: this.options,
    playerNames: this.players.map((player) => player.socket.name),
    type: this.type,
  };
};

Room.prototype.getSummary = function () {
  return {
    name: this.name,
    nbPlayers: this.members.count((member) => member.type === "player"),
    nbViewers: this.members.count((member) => member.type === "viewer"),
    options: this.options,
    type: this.type,
  };
};

Room.prototype.send = function (update = this.get()) {
  this.globals.io.to(this.name).emit("handleRoom", update);
  this.globals.io.to("").emit("handleRooms", this.globals.getRoomsClear());
};

Room.prototype.addMember = async function (socket) {
  socket.room = this;
  const newMember = new Member(
    this.globals,
    socket,
    this.members.length < this.options.nbPlayersMax ? "player" : "viewer"
  );
  await newMember.join();
  this.members.push(newMember);
  if (this.members.length === 1) await this.members[0].setAdmin(true);
  this.send();
};

Room.prototype.removeMember = async function (socketName) {
  const index = this.members.findIndex(
    (member) => member.socket.name === socketName
  );
  if (index !== -1) {
    const [member] = this.members.splice(index, 1);
    await member.leave();
    if (!this.members.length) await this.globals.removeRoom(this);
    else {
      if (member.isAdmin) await this.members[0].setAdmin(true);
      this.send({ members: getMembers(this.members) });
    }
  }
};

Room.prototype.updateOptions = function (options) {
  const updates = {};
  if (
    options.gravity !== this.options.gravity &&
    [0.5, 1, 1.5, 2].includes(options.gravity)
  )
    updates.gravity = options.gravity;
  if (
    options.keep !== this.options.keep &&
    [true, false].includes(options.keep)
  )
    updates.keep = options.keep;
  if (
    options.invisibility !== this.options.invisibility &&
    [true, false].includes(options.invisibility)
  )
    updates.invisibility = options.invisibility;
  if (
    options.nbPlayersMax !== this.options.nbPlayersMax &&
    [1, 2, 3, 4].includes(options.nbPlayersMax)
  )
    updates.nbPlayersMax = options.nbPlayersMax;
  this.options = { ...this.options, ...updates };
  if (Object.keys(updates).length) this.send({ options: this.options });
};

Room.prototype.startGame = async function () {
  if (this.players.length) return;
  const pieceIndexes = [];
  this.globals.io.to(this.name).emit("handleRoom", {
    isRunning: true,
    playerNames: this.members
      .filter((member) => member.type === "player")
      .map((member) => member.socket.name),
  });
  await Promise.all(
    this.members.map(async (member) => {
      await member.leave();
      if (member.type === "player") {
        const newPlayer = new Player(
          this.globals,
          member.socket,
          this.options,
          pieceIndexes
        );
        await newPlayer.join();
        newPlayer.resetTimeout();
        newPlayer.send();
        this.players.push(newPlayer);
      } else {
        const newViewer = new Viewer(this.globals, member.socket);
        await newViewer.join();
        this.viewers.push(newViewer);
      }
    })
  );
};

Room.prototype.endGame = async function () {
  if (this.players.some((player) => player.isPlaying)) return;
  this.players.forEach((player) => {
    this.globals.addScore({
      name: player.socket.name,
      options: this.options,
      points: player.points,
    });
  });
  await Promise.all([
    ...this.players.map((player) => player.leave()),
    ...this.viewers.map((viewer) => viewer.leave()),
  ]);
  await Promise.all(
    this.members.map(async (member) => {
      await member.join();
      if (member.isAdmin) await member.joinAdmin();
    })
  );
  this.players = [];
  this.viewers = [];
  this.send({ isRunning: false });
};
