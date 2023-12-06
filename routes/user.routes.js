import express from "express";
import {
  getAllUsers,
  addNewUser,
  updateUser,
  deleteUser,
  getOneUser
} from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.js";
import { paginate } from "../middlewares/pagination.js";
import { sortData } from "../middlewares/sorting.js";
import { authenticate } from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.get("/", paginate, sortData, getAllUsers);
userRouter.post("/add", upload.single("image"), addNewUser);
userRouter.put("/update", upload.single("image"), authenticate, updateUser);
userRouter.delete("/delete", authenticate, deleteUser);
userRouter.get('/readOne', authenticate, getOneUser)

export { userRouter };
