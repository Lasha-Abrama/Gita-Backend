const User = require("../models/user.model");

async function createUser(req, res, next) {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
}

async function getAllUsers(req, res, next) {
  try {
    const users = await User.find()
      .select("name score answeredQuestions createdAt updatedAt")
      .sort({ createdAt: -1 });

    res.json({
      count: users.length,
      users,
    });
  } catch (error) {
    next(error);
  }
}

async function getUserById(req, res, next) {
  try {
    if (req.params.id !== req.userId) {
      return res.status(403).json({ message: "You can only access your own account" });
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({ user });
  } catch (error) {
    next(error);
  }
}

async function updateUser(req, res, next) {
  try {
    if (req.params.id && req.params.id !== req.userId) {
      return res.status(403).json({ message: "You can only update your own account" });
    }

    const user = await User.findByIdAndUpdate(req.userId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const io = req.app.get("io");
    if (io) io.emit("leaderboard:update", await require("../services/leaderboard.service")());
    if (io?.emitOnlineUsers) await io.emitOnlineUsers();

    res.json({
      message: "Username updated successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
}

async function deleteUser(req, res, next) {
  try {
    if (req.params.id !== req.userId) {
      return res.status(403).json({ message: "You can only delete your own account" });
    }

    const user = await User.findByIdAndDelete(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const io = req.app.get("io");
    if (io) io.emit("leaderboard:update", await require("../services/leaderboard.service")());

    res.json({
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
