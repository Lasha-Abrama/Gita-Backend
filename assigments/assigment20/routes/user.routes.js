const express = require("express");

const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

const validate = require("../middlewares/validate.middleware");

const { updateUserSchema } = require("../validations/user.validation");

const { idParamSchema } = require("../validations/common.validation");
const isAuth = require("../middlewares/is-auth.middleware");

const router = express.Router();

router.get("/", isAuth, getAllUsers);

router.patch("/me", isAuth, validate(updateUserSchema), updateUser);

router.get("/:id", isAuth, validate(idParamSchema, "params"), getUserById);

router.patch(
  "/:id",
  isAuth,
  validate(idParamSchema, "params"),
  validate(updateUserSchema),
  updateUser,
);

router.delete("/:id", isAuth, validate(idParamSchema, "params"), deleteUser);

module.exports = router;
