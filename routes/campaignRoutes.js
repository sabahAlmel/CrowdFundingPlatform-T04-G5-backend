// routes/campaignRoutes.js
import express from 'express';
import { getAllCampaigns , createCampaign , getOneCampaign , getCampaignsByCategory , updateCampaign , deleteCampaign } from '../controllers/campaignControllers.js';
import { upload } from '../middlewares/multer.js';
import { paginate } from '../middlewares/pagination.js';

const campaignRouter = express.Router();

campaignRouter.get('/', paginate , getAllCampaigns);
campaignRouter.get('/:id',getOneCampaign)
campaignRouter.get('/category/:category',getCampaignsByCategory)
campaignRouter.post('/add',upload.single("image"),createCampaign)
campaignRouter.patch('/update/:id',upload.single("image"), updateCampaign)
campaignRouter.delete('/delete/:id',upload.single('image'),deleteCampaign)

export {campaignRouter}