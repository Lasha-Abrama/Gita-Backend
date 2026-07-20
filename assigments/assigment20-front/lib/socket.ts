"use client";

import { io, type Socket } from "socket.io-client";

let socket: Socket | null = null;

export function getSocket(token = "") {
  if (!socket) {
    socket = io(
      process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3000",
      {
        autoConnect: false,
        reconnection: true,
        reconnectionAttempts: Infinity,
        auth: { token },
      },
    );
  }

  socket.auth = { token };

  return socket;
}
