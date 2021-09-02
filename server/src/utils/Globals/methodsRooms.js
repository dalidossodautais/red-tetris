import Room from "../../Room";
import Globals, { removeIt } from ".";

function checkCreateRoom(room, rooms) {
  if (
    !room ||
    !["solo", "private", "public"].includes(room.type) ||
    (["private", "public"].includes(room.type) &&
      (typeof room.name !== "string" ||
        room.name.length < 3 ||
        room.name.length > 20)) ||
    (room.type === "private" &&
      (typeof room.password !== "string" ||
        room.password.length < 3 ||
        room.password.length > 20))
  )
    return { other: "Rejected" };
  if (rooms.some((thisRoom) => room.name === thisRoom.name))
    return { name: "Already taken" };
}

function checkJoinRoom(room, rooms) {
  const savedRoom = rooms.find((thisRoom) => room.name === thisRoom.name);
  if (!savedRoom) return { other: "Unknown" };
  if (savedRoom.type === "private" && savedRoom.password !== room.password)
    return { password: "Wrong password" };
}

function generateNewRoomName(rooms) {
  let i = 0;
  while (rooms.some((thisRoom) => thisRoom.name === `/${i}`)) ++i;
  return `/${i}`;
}

async function removeMember(member) {
  await member.leave();
  member.socket.room = null;
  await this.addUser(member.socket);
}

Globals.prototype.createRoom = async function (user, room) {
  if (user.isJoining === true) return {};
  user.isJoining = true;
  const errors = checkCreateRoom(room, this.rooms);
  if (errors) {
    user.isJoining = false;
    return errors;
  }
  let { name, type, password } = room;
  if (type === "solo") name = generateNewRoomName(this.rooms);
  const newRoom = new Room(this, name, type, password);
  this.rooms.unshift(newRoom);
  await user.leave();
  await newRoom.addMember(user.socket);
  user.isJoining = false;
};

Globals.prototype.joinRoom = async function (user, room) {
  if (user.isJoining) return {};
  user.isJoining = true;
  const errors = checkJoinRoom(room, this.rooms);
  if (errors) {
    user.isJoining = false;
    return errors;
  }
  await user.leave();
  this.rooms
    .find((thisRoom) => room.name === thisRoom.name)
    .addMember(user.socket);
  user.isJoining = false;
};

Globals.prototype.getRoomsClear = function () {
  const roomsClear = [];
  this.rooms.forEach((room) => {
    if (room.type !== "solo") roomsClear.push(room.getSummary());
  });
  return roomsClear;
};

Globals.prototype.removeRoom = async function (thisRoom) {
  await thisRoom.members.map((member) => removeMember(member));
  removeIt(this.rooms, (room) => room.name === thisRoom.name);
  this.io.to("").emit("handleRooms", this.getRoomsClear());
};
