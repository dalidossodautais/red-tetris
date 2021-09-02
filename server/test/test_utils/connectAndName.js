import Socket from "socket.io-client";

export default async function connectAndName(url, name) {
  const socket = Socket(url);
  if (!socket.connected)
    await new Promise((resolve) => socket.once("connect", resolve));
  const promise = new Promise((resolve) =>
    socket.once("handleUsername", resolve)
  );
  socket.emit("saveUsername", name);
  await promise;
  return socket;
}
