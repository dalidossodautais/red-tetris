import "regenerator-runtime/runtime";
import Socket from "socket.io-client";

const href =
  process.env.NODE_ENV === "production"
    ? window.location.href.replace("http://", "")
    : "0.0.0.0:8080";

export const socket = Socket(href, { transports: ["websocket", "polling"] });

export async function reconnect() {
  socket.connect();
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (!socket.connected) await reconnect();
}

socket.on("disconnect", async (reason) => {
  if (reason === "io server disconnect") await reconnect();
});

export * from "./home";
export * from "./room";
export * from "./root";
