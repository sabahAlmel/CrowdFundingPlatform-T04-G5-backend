import express from "express";
import {
  getAllUsers,
  addNewUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.js";
import { paginate } from "../middlewares/pagination.js";
import { authorize } from "../middlewares/auth.js";
import { sortData } from "../middlewares/sorting.js";

const userRouter = express.Router();

userRouter.get("/", paginate, sortData, getAllUsers);
userRouter.post("/add", upload.single("image"), addNewUser);
userRouter.put("/update", upload.single("image"), authorize, updateUser);
userRouter.delete("/delete", authorize, deleteUser);

export { userRouter };
