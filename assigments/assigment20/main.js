const express = require("express");
const http = require("http");
const cors = require("cors");
const connectToDb = require("./config/db");
const seedQuizzes = require("./seed/quiz.seed");
const userRouter = require("./routes/user.routes");
const quizRouter = require("./routes/quiz.routes");
const answerRouter = require("./routes/answer.routes");
const leaderboardRouter = require("./routes/leaderboard.routes");
const errorMiddleware = require("./middlewares/error.middleware");
const initializeSocket = require("./sockets/socket");
const authRouter = require("./auth/auth.controller");

require("dotenv").config();

const app = express();
const server = http.createServer(app);

const io = initializeSocket(server);
app.set("io", io);

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/quizzes", quizRouter);
app.use("/api/answers", answerRouter);
app.use("/api/leaderboard", leaderboardRouter);

app.get("/", (req, res) => {
  res.json({ message: "Quiz server is running" });
});

app.use((req, res) => {
  res.status(404).json({
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

connectToDb()
  .then(async () => {
    await seedQuizzes();

    server.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  });
