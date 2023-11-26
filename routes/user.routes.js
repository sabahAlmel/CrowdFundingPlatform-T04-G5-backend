import express from "express";
import {
  getAllUsers,
  addNewUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.js";
import { paginate } from "../middlewares/donor.js";

const userRouter = express.Router();

userRouter.get("/", paginate, getAllUsers);
userRouter.post("/add", upload.single("image"), addNewUser);
userRouter.put("/update", upload.single("image"), updateUser);
userRouter.delete("/delete", deleteUser);

export { userRouter };
