const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

function createAccessToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

async function signUp({ name, email, password }) {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return "ALREADY_EXISTS";
  }

  const user = await User.create({
    name,
    email,
    password: await bcrypt.hash(password, 10),
  });

  const safeUser = user.toObject();
  delete safeUser.password;

  return {
    accessToken: createAccessToken(user._id),
    user: safeUser,
  };
}

async function signIn({ email, password }) {
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return "INVALID_CREDENTIALS";
  }

  const safeUser = user.toObject();
  delete safeUser.password;

  return {
    accessToken: createAccessToken(user._id),
    user: safeUser,
  };
}

function currentUser(userId) {
  return User.findById(userId);
}

module.exports = { signUp, signIn, currentUser };
