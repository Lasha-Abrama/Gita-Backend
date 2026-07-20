const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const getLeaderboard = require("../services/leaderboard.service");
const User = require("../models/user.model");

async function emitOnlineUsers(io, onlineUsers) {
  const userIds = [...onlineUsers.keys()];
  const users = await User.find({ _id: { $in: userIds } })
    .select("name")
    .lean();
  const namesById = new Map(
    users.map((user) => [String(user._id), user.name]),
  );

  for (const clientSocket of io.sockets.sockets.values()) {
    const visibleUsers = userIds
      .filter(
        (userId) =>
          userId !== clientSocket.data.userId && namesById.has(userId),
      )
      .map((userId) => ({
        userId,
        name: namesById.get(userId),
      }));

    clientSocket.emit("online-users:update", {
      count: visibleUsers.length,
      users: visibleUsers,
    });
  }
}

function initializeSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  const onlineUsers = new Map();
  io.emitOnlineUsers = () => emitOnlineUsers(io, onlineUsers);

  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      socket.data.userId = String(payload.userId);
      next();
    } catch (error) {
      next(new Error("Authentication required"));
    }
  });

  io.on("connection", async (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    const userId = socket.data.userId;
    const connections = onlineUsers.get(userId) || new Set();
    connections.add(socket.id);
    onlineUsers.set(userId, connections);

    try {
      await emitOnlineUsers(io, onlineUsers);
      const leaderboard = await getLeaderboard();

      socket.emit("leaderboard:update", leaderboard);
    } catch (error) {
      console.error("Failed to send initial leaderboard:", error.message);
    }

    socket.on("disconnect", async (reason) => {
      console.log(`Socket disconnected: ${socket.id}, reason: ${reason}`);

      const userConnections = onlineUsers.get(userId);
      userConnections?.delete(socket.id);
      if (!userConnections?.size) onlineUsers.delete(userId);

      try {
        await emitOnlineUsers(io, onlineUsers);
      } catch (error) {
        console.error("Failed to update online users:", error.message);
      }
    });
  });

  return io;
}

module.exports = initializeSocket;
