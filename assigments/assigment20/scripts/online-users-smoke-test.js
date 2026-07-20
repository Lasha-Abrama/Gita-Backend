const { io } = require("socket.io-client");

const apiUrl = process.env.API_URL || "http://localhost:3000";
const password = "testpass123";
const accounts = [];
const sockets = [];

async function request(path, options = {}, token = "") {
  const response = await fetch(`${apiUrl}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(`${response.status}: ${data.message}`);
  return data;
}

async function createAccount(name) {
  const response = await request("/api/auth/sign-up", {
    method: "POST",
    body: JSON.stringify({
      name,
      email: `online-${name.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}@example.com`,
      password,
    }),
  });
  accounts.push({ token: response.accessToken, user: response.user });
  return accounts.at(-1);
}

function createSocket(token) {
  const socket = io(apiUrl, { auth: { token }, transports: ["websocket"], autoConnect: false });
  sockets.push(socket);
  return socket;
}

function connect(socket) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Socket connection timed out")), 5000);
    socket.once("connect", () => { clearTimeout(timer); resolve(socket); });
    socket.once("connect_error", reject);
    socket.connect();
  });
}

function nextOnlineUpdate(socket, expectedCount) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Online users event timed out")), 5000);
    const listener = (payload) => {
      if (payload.count !== expectedCount) return;
      clearTimeout(timer);
      socket.off("online-users:update", listener);
      resolve(payload);
    };
    socket.on("online-users:update", listener);
  });
}

async function run() {
  const alpha = await createAccount("Alpha Player");
  const beta = await createAccount("Beta Player");
  const alphaSocket = createSocket(alpha.token);
  await connect(alphaSocket);
  const alphaUpdate = nextOnlineUpdate(alphaSocket, 1);
  const betaSocket = createSocket(beta.token);
  const betaUpdate = nextOnlineUpdate(betaSocket, 1);
  await connect(betaSocket);

  const [alphaPayload, betaPayload] = await Promise.all([alphaUpdate, betaUpdate]);

  if (alphaPayload.users.some((user) => user.userId === alpha.user._id)) {
    throw new Error("Alpha saw their own account in the online list");
  }
  if (betaPayload.users.some((user) => user.userId === beta.user._id)) {
    throw new Error("Beta saw their own account in the online list");
  }
  if (alphaPayload.users[0]?.name !== "Beta Player") {
    throw new Error("Alpha did not receive Beta in the online list");
  }
  if (betaPayload.users[0]?.name !== "Alpha Player") {
    throw new Error("Beta did not receive Alpha in the online list");
  }

  console.log("✓ each socket receives the other signed-in player");
  console.log("✓ each socket's own user is excluded from the list");
}

run()
  .then(() => console.log("Online users smoke test passed"))
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    sockets.forEach((socket) => socket.disconnect());
    await Promise.all(accounts.map(({ token, user }) =>
      request(`/api/users/${user._id}`, { method: "DELETE" }, token).catch(() => null),
    ));
  });
