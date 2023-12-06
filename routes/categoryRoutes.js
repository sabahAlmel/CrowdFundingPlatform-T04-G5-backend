import express from "express";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryControllers.js";

const categoryRouter = express.Router();

categoryRouter.get("/", getAllCategories);
categoryRouter.post("/add", createCategory);
categoryRouter.patch("/update/:id", updateCategory);
categoryRouter.delete("/delete/:id", deleteCategory);

export { categoryRouter };
