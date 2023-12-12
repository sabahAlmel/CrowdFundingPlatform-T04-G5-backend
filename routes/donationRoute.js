import express from "express";
import {
  createDonation,
  getDonations,
  getDonationsByCreatorId,getDonationsByDonor,
} from "../controllers/donationsConroller.js";
import { checkBalance } from "../middlewares/donationsMidware.js";
import { authenticate } from "../middlewares/auth.js";
import { checkRoles } from "../middlewares/auth.js";

const donationRouter = express.Router();

donationRouter.post(
  "/add",
  authenticate,
  checkRoles(["donor"]),
  checkBalance,
  createDonation
);
donationRouter.get("/read", authenticate, getDonations);
donationRouter.get(
  "/read/donationsByCreator",
  authenticate,
  checkRoles(["creator"]),
  getDonationsByCreatorId
);

donationRouter.get("/read/ByDonor", authenticate, getDonationsByDonor);

export default donationRouter;
