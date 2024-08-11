import { io } from "socket.io-client";

const serverUrl = "http://127.0.0.1:3000";
const clientUrl = "http://127.0.0.1:5173";

export const socket = io(serverUrl, {
  transports: ["websocket"],
  cors: {
    origin: clientUrl,
    credentials: true,
  },
  autoConnect: false,
});
