import Campaign from '../models/campaignModel.js';
import fs from 'fs'

// Get All Campaigns

const getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.findAll();
    res.json(campaigns);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Create a new Campaign

const createCampaign = async (req,res) =>{

  const {title , target , description , amountContributed , status} = req.body;

  if(!req.file){
    return res.status(400).json({error:"Please upload an image"})
  }

  const image = req.file.filename

  try{

    const newCampaign = await Campaign.create({
      title,target , description , amountContributed , status , image
    })

    res.status(201).json(newCampaign)
  }
  catch(error){
    console.log(error);
    res.status(500).json({error:"Internal Server Error"})
    const path = `public/images/${req.file.filename}`;
    fs.unlinkSync(path)
  }
}

export { getAllCampaigns , createCampaign};