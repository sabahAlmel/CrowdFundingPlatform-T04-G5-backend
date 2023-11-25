// routes/campaignRoutes.js
import express from 'express';
import { getAllCampaigns , createCampaign , getOneCampaign , getCampaignsByCategory , updateCampaign , deleteCampaign } from '../controllers/campaignControllers.js';
import { upload } from '../middlewares/multer.js';

const campaignRouter = express.Router();

campaignRouter.get('/', getAllCampaigns);
campaignRouter.get('/:id',getOneCampaign)
campaignRouter.get('/category/:category',getCampaignsByCategory)
campaignRouter.post('/add',upload.single("image"),createCampaign)
campaignRouter.patch('/update/:id',upload.single("image"), updateCampaign)
campaignRouter.delete('/delete/:id',upload.single('image'),deleteCampaign)

export {campaignRouter}