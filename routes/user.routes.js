import express from "express";
import {
  getAllUsers,
  addNewUser,
  deleteUser,
} from "../controllers/user.controllers.js";
// import upload from "../middleware/multer.js";

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
// userRouter.post("/add", upload.single("image"), addNewUser);
// userRouter.put("/update/:id", upload.single("image"), httpUpdateTour);
userRouter.delete("/delete/:id", deleteUser);

export { userRouter };
