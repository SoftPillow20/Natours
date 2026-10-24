import e from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/userController.js";
import { login, signup } from "../controllers/authController.js";

const router = e.Router();

router.post("/signup", signup);
router.post("/login", login);

router.route("/").get(getAllUsers).post(createUser);

router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

export { router };
