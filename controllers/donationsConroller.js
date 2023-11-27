import { where } from "sequelize";
import Donations from "../models/donations.js";
import Donor from "../models/donor.js";
import Campaign from "../models/campaignModel.js";

export async function createDonation(req, res) {
  const { donorId, amount, campaignId } = req.body;
  let donor = req.donor
  console.log(donor)

  donor.balance = donor.balance - amount;
  donor.numberOfContribution = donor.numberOfContribution + 1;
  donor.amountPaid = donor.amountPaid + Number(amount);
  const campaign = await Campaign.findByPk(campaignId)
  if(campaign){

    const newDonation = await Donations.create({
      transferredAmount: amount,
      DonorId: donorId,
      CampaignId: campaignId
    });
    campaign.amountContributed += amount 
    await donor.save();
    await campaign.save()
    await newDonation.save(); 
    res.json({ data: newDonation, donor: donor });
  }
}
export async function getDonations(req, res){
  try {
    if(req.userRole === 'admin'){
      const data = await Donations.findAll({include: Object.values(Donations.associations)})
      return res.json({data: data})
    }
    const data = await Donations.findAll({include: {model: req.userRole, where: {id: req.userId}}})
    res.json({data: data})
  } catch (error) {
    console.log(error)
  }
}