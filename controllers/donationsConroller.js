import { where } from "sequelize";
import Donations from "../models/donations.js";
import Donor from "../models/donor.js";
import Campaign from "../models/campaignModel.js";

export async function createDonation(req, res) {
  const { donorId, amount, campaignId } = req.body;
  let donor = req.donor

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
    const data = await Donations.findAll({include: 'Donor'})
    res.json({data: data})
  } catch (error) {
    console.log(error)
  }
}