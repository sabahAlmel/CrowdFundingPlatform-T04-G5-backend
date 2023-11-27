// routes/campaignRoutes.js
import express from 'express';
import { getAllCampaigns , createCampaign , getOneCampaign , getCampaignsByCategory , updateCampaign , deleteCampaign, getPendingCampaigns , getCampaignsByCreatorId } from '../controllers/campaignControllers.js';
import { upload } from '../middlewares/multer.js';
import { paginate } from '../middlewares/pagination.js';
import { authorize } from '../middlewares/auth.js';
import { sortData } from '../middlewares/sorting.js';

const campaignRouter = express.Router();

campaignRouter.get('/', paginate, sortData, getAllCampaigns);
campaignRouter.get('/creator', authorize , getCampaignsByCreatorId)
campaignRouter.get('/pending',authorize, getPendingCampaigns)
campaignRouter.get('/:id',getOneCampaign)
campaignRouter.get('/category/:category',getCampaignsByCategory)
campaignRouter.post('/add',upload.single("image"), authorize, createCampaign)
campaignRouter.patch('/update/:id',upload.single("image"), updateCampaign)
campaignRouter.delete('/delete/:id',upload.single('image'),deleteCampaign)

export {campaignRouter}