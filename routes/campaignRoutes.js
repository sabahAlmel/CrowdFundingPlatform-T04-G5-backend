// routes/campaignRoutes.js
import express from "express";
import {
  getAllCampaigns,
  createCampaign,
  getOneCampaign,
  getCampaignsByCategory,
  updateCampaign,
  deleteCampaign,
  getPendingCampaigns,
  getCampaignsByCreatorId,
} from "../controllers/campaignControllers.js";
import { upload } from "../middlewares/multer.js";
import { paginate } from "../middlewares/pagination.js";
import { sortData } from "../middlewares/sorting.js";
import { authenticate } from "../middlewares/auth.js";
import { checkRoles } from "../middlewares/auth.js";

const campaignRouter = express.Router();

campaignRouter.get("/", paginate, sortData, getAllCampaigns);
campaignRouter.get("/creator", authenticate, getCampaignsByCreatorId);
campaignRouter.get(
  "/pending",
  authenticate,
  checkRoles(["admin"]),
  getPendingCampaigns
);
campaignRouter.get("/:id", getOneCampaign);
campaignRouter.get("/category/:category", getCampaignsByCategory);
campaignRouter.post(
  "/add",
  upload.single("image"),
  authenticate,
  checkRoles(["creator"]),
  createCampaign
);
campaignRouter.patch(
  "/update/:id",
  upload.single("image"),
  authenticate,
  checkRoles(["creator"]),
  updateCampaign
);
campaignRouter.delete(
  "/delete/:id",
  upload.single("image"),
  authenticate,
  checkRoles(["admin", "creator"]),
  deleteCampaign
);

export { campaignRouter };
