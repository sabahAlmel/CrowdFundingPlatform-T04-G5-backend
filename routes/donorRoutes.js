import express from "express";
import {
  addDonor,
  editDonor,
  readDonors,
} from "../controllers/donorControllers.js";
import { paginate } from "../middlewares/pagination.js";
import { authenticate, checkRoles } from "../controllers/auth.controllers.js";

const donorRouter = express.Router();

donorRouter.post("/add", addDonor);
donorRouter.patch("/deposit", authenticate, checkRoles(["donor"]), editDonor);
donorRouter.get("/", paginate, authenticate, checkRoles(["admin"]), readDonors);
// donorRouter.delete('/delete', deleteDonor)

export default donorRouter;
