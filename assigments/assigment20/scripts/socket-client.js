const { io } = require("socket.io-client");

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log(`Connected with socket ID: ${socket.id}`);
});

socket.on("online-users:update", (data) => {
  console.log("Online users:", data.count);
});

socket.on("leaderboard:update", (leaderboard) => {
  console.log("Leaderboard updated:");
  console.table(leaderboard);
});

socket.on("connect_error", (error) => {
  console.error("Connection error:", error.message);
});

socket.on("disconnect", (reason) => {
  console.log("Disconnected:", reason);
});

process.on("SIGINT", () => {
  socket.disconnect();
  process.exit(0);
});
