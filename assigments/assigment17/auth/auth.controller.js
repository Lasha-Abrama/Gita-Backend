const { Router } = require("express");
const validate = require("../middlewares/validate");
const { signUpDto } = require("./dto/sign-up.dto");
const { signInDto } = require("./dto/sign-in.dto");
const AuthService = require("./auth.service");
const isAuthMiddleware = require("../middlewares/is-auth.middleware");

const authRouter = new Router();

authRouter.post("/sign-up", validate(signUpDto), async (req, res) => {
  const { fullName, email, password, birthDate } = req.body;
  if (!fullName || !email || !password || !birthDate)
    return res.status(400).json({
      message: "email, password, fullname and birth date are required",
    });

  const resp = await AuthService.signUp({
    fullName,
    email,
    password,
    birthDate,
  });
  if (resp === "ALREADY_EXISTS") {
    return res.status(400).json({ message: "user already registered" });
  }

  res.status(201).json({ message: "user signed-up successfully" });
});

authRouter.post("/sign-in", validate(signInDto), async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "email and password are required" });
  const resp = await AuthService.signIn({ email, password });

  if (resp === "INVALID_CREDENTIALS") {
    return res.status(400).json({ message: "email or password is incorrect" });
  }
  res.status(200).json({ accessToken: resp });
});

authRouter.get("/current-user", isAuthMiddleware, async (req, res) => {
  const user = await AuthService.currentUser(req.userId);
  if (!user) {
    return res.status(404).json({ message: " user not found" });
  }
  res.json(user);
});

module.exports = authRouter;
