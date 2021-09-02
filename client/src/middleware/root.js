import { socket } from ".";

export function handlePath(history, location, setPathError) {
  socket.on("handlePath", (path) => {
    if (location.pathname !== path.name) history.push(path.name);
    if (path.error) setPathError(path.error);
  });
  socket.emit("getPath", location.pathname);
}
export function unhandlePath() {
  socket.removeAllListeners("handlePath");
}

export async function handleUsername(setUsername, setError) {
  socket.on("handleUsername", ({ error, username }) => {
    setUsername(username);
    if (username) setUsername(username);
    if (error) setError(error);
  });
  socket.emit("getUsername");
}
export async function unhandleUsername() {
  socket.off("handleUsername");
}
export function saveUsername(username) {
  socket.emit("saveUsername", username);
}
