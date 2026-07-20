const { io } = require("socket.io-client");

const apiUrl = process.env.API_URL || "http://localhost:3000";
const email = `quibly-smoke-${Date.now()}@example.com`;
const password = "testpass123";
let token = "";
let userId = "";
let socket;

async function request(path, options = {}) {
  const response = await fetch(`${apiUrl}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(`${response.status}: ${data.message}`);
  return data;
}

async function run() {
  const registration = await request("/api/auth/sign-up", {
    method: "POST",
    body: JSON.stringify({ name: "Smoke Player", email, password }),
  });
  token = registration.accessToken;
  userId = registration.user._id;
  if (registration.user.password) throw new Error("Password hash leaked from sign-up");
  console.log("✓ sign-up returns a JWT and user");

  token = "";
  const login = await request("/api/auth/sign-in", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  if (login.user.password) throw new Error("Password hash leaked from sign-in");
  token = login.accessToken;
  console.log("✓ sign-in returns a JWT");

  const current = await request("/api/auth/current-user");
  if (current.user._id !== userId) throw new Error("JWT resolved the wrong user");
  console.log("✓ current-user resolves the authenticated account");

  const updated = await request("/api/users/me", {
    method: "PATCH",
    body: JSON.stringify({ name: "Renamed Smoke Player" }),
  });
  if (updated.user.name !== "Renamed Smoke Player") throw new Error("Username was not updated");
  console.log("✓ username can be changed without changing email");

  socket = io(apiUrl, { auth: { token }, transports: ["websocket"] });
  await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Socket connection timed out")), 5000);
    socket.once("connect", () => { clearTimeout(timer); resolve(); });
    socket.once("connect_error", reject);
  });
  await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Initial leaderboard event timed out")), 5000);
    socket.once("leaderboard:update", () => { clearTimeout(timer); resolve(); });
  });
  console.log("✓ authenticated Socket.IO client connects");

  const quizzes = await request("/api/quizzes");
  const quiz = await request(`/api/quizzes/${quizzes.quizzes[0]._id}`);
  const question = quiz.quiz.questions[0];
  const leaderboardEvent = new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Answer leaderboard event timed out")), 5000);
    socket.once("leaderboard:update", (entries) => {
      clearTimeout(timer);
      resolve(entries);
    });
  });
  await request("/api/answers", {
    method: "POST",
    body: JSON.stringify({
      quizId: quiz.quiz._id,
      questionId: question._id,
      selectedOption: 0,
    }),
  });
  const entries = await leaderboardEvent;
  if (!entries.some((entry) => String(entry.userId) === userId && entry.name === "Renamed Smoke Player")) {
    throw new Error("Live leaderboard did not contain the authenticated user");
  }
  console.log("✓ an answer emits the authenticated user's live leaderboard entry");
}

run()
  .then(() => console.log("Authentication smoke test passed"))
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    socket?.disconnect();
    if (token && userId) {
      try { await request(`/api/users/${userId}`, { method: "DELETE" }); } catch {}
    }
  });
