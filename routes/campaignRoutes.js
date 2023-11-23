// routes/campaignRoutes.js
import express from 'express';
import { getAllCampaigns , createCampaign } from '../controllers/campaignControllers.js';
import { upload } from '../middlewares/multer.js';

const campaignRouter = express.Router();

campaignRouter.get('/', getAllCampaigns);
campaignRouter.post('/add',upload.single("image"),createCampaign)

export {campaignRouter}