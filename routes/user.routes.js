import express from "express";
import {
  getAllUsers,
  addNewUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.post("/add", upload.single("image"), addNewUser);
userRouter.put("/update/:id", upload.single("image"), updateUser);
userRouter.delete("/delete/:id", deleteUser);

export { userRouter };
