const { Router } = require("express");
const UserService = require("./user.service");
const isValidMongoIdMiddleware = require("../middlewares/is-valid-mongo-id.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

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
