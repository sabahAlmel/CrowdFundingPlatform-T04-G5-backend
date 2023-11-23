import Campaign from '../models/campaignModel.js';
import fs from "fs";

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


// Get a specific Campaign

const getOneCampaign = async (req,res) => {

  const campaignId = req.params.id

  try{
    const campaign = await Campaign.findOne({ where: { id: campaignId } });

    if (campaign) {
      res.status(200).json(campaign);
    } else {
      res.status(404).json({ error: 'Campaign not found' });
    }
  }
  catch(error){
    console.log(error)
    res.status(500).json({error:"Internal Server Error"})
  }
}

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


// Update a Campaign

const updateCampaign = async (req,res) =>{

  const campaignId = req.params.id

  const oldCampaign = await Campaign.findOne({ where: { id: campaignId } });

  try{
    const updatedData = req.body;

    const oldImagePath = `public/images/${oldCampaign.image}`;

    if(req.file){
      updatedData.image = req.file.filename

      fs.unlink(oldImagePath, (err) =>{
        if(err){
          return res.status(500).json({error : `error deleting the old image`})
        }
      })
    }

    await oldCampaign.update(updatedData);

    res.status(200).json({ message: 'Campaign updated successfully' })
  }
  catch(error){
    console.log(error)
    res.status(500).json({error:`Error , ${error.message}`})
  }
}


// Delete a specific Campaign 

const deleteCampaign = async (req,res) =>{

  const campaignId = req.params.id

  try{
    const campaignToDelete = await Campaign.findOne({ where: { id: campaignId } });

    if(!campaignToDelete){
      return res.status(404).json({error:'Campaign not found'})
    }

    await campaignToDelete.destroy();

    const oldImagePath = `public/images/${campaignToDelete.image}`;

    fs.unlink(oldImagePath, (err) =>{
      if(err){
        return res.status(500).json({error : `error deleting the old image`})
      }
    })

    res.status(200).json({message:'Campaign deleted successfully'})
  }
  catch(error){
    console.log(error);
    res.status(500).json({error:'Internal Server Error'})
  }

}



export { getAllCampaigns , createCampaign , getOneCampaign , updateCampaign , deleteCampaign};