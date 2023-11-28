import express from 'express'
import { createDonation, getDonations , getDonationsByCreatorId} from '../controllers/donationsConroller.js'
import { checkBalance } from '../middlewares/donationsMidware.js'
import { authorize, isDonor } from '../middlewares/auth.js';
import { isCreator } from '../middlewares/auth.js';

const donationRouter = express.Router();

donationRouter.post("/add", authorize,isDonor, checkBalance, createDonation);
donationRouter.get("/read", authorize, getDonations);
donationRouter.get("/read/donationsByCreator", authorize , isCreator , getDonationsByCreatorId )

export default donationRouter;
