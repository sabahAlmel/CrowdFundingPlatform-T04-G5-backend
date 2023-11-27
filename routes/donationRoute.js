import express from 'express'
import { createDonation, getDonations } from '../controllers/donationsConroller.js'
import { checkBalance } from '../middlewares/donationsMidware.js'
import { authorize, isDonor } from '../middlewares/auth.js';

const donationRouter = express.Router();

donationRouter.post("/add", authorize,isDonor, checkBalance, createDonation);
donationRouter.get("/read", authorize, getDonations);

export default donationRouter;
