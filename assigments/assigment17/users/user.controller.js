const { Router } = require("express");
const UserService = require("./user.service");
const isValidMongoIdMiddleware = require("../middlewares/is-valid-mongo-id.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const isAuthMiddleware = require("../middlewares/is-auth.middleware");
const upload = require("../middlewares/upload.middleware");

const userRouter = new Router();

userRouter.get("/", async (req, res) => {
  let users = await UserService.getAllUsers(req.query);
  res.json(users);
});

userRouter.get("/:id", isValidMongoIdMiddleware, async (req, res) => {
  const user = await UserService.getUserById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }
  res.json(user);
});

userRouter.post(
  "/profile-image",
  isAuthMiddleware,
  upload.single("image"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "image is required" });
    }

    const user = await UserService.uploadProfileImage(
      req.userId,
      req.file.buffer,
    );

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    if (user === "IMAGE_ALREADY_EXISTS") {
      // HTTP Conflict
      return res.status(409).json({
        message: "profile image already exists; use update instead",
      });
    }

    res.status(201).json({
      message: "profile image uploaded successfully",
      data: user,
    });
  },
);

userRouter.delete("/profile-image", isAuthMiddleware, async (req, res) => {
  const result = await UserService.deleteProfileImage(req.userId);

  if (!result) {
    return res.status(404).json({ message: "user not found" });
  }

  if (result === "IMAGE_NOT_FOUND") {
    return res.status(404).json({ message: "profile image not found" });
  }

  res.json({
    message: "profile image deleted successfully",
    data: result,
  });
});

userRouter.delete(
  "/:id",
  isValidMongoIdMiddleware,
  roleMiddleware(["admin"]),
  async (req, res) => {
    const deletedUser = await UserService.deleteUserById(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "user not found" });
    }

    res.json({ success: true, data: deletedUser });
  },
);

userRouter.put(
  "/profile-image",
  isAuthMiddleware,
  upload.single("image"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "image is required" });
    }

    const user = await UserService.updateProfileImage(
      req.userId,
      req.file.buffer,
    );

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    res.json({
      message: "profile image updated successfully",
      data: user,
    });
  },
);

userRouter.put(
  "/:id",
  isValidMongoIdMiddleware,
  roleMiddleware(["editor", "admin"]),
  async (req, res) => {
    const updatedUser = await UserService.updateUserById(
      req.params.id,
      req.body,
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "user not found" });
    }

    res.json({ success: true, data: updatedUser });
  },
);

module.exports = userRouter;
