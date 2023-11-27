import { Op, where } from "sequelize";
import Donations from "../models/donations.js";
import Donor from "../models/donor.js";
import Campaign from "../models/campaignModel.js";
import Creator from "../models/Creator.models.js";

export async function createDonation(req, res) {
  const { amount, campaignId } = req.body;
  const donor = await Donor.findByPk(req.roleId);
  console.log(req.body)
  donor.balance -= Number(amount);
  donor.numberOfContribution += 1;
  donor.amountPaid = donor.amountPaid + Number(amount);
  const campaign = await Campaign.findByPk(campaignId);
  
  if (campaign) {
    const newDonation = await Donations.create({
      transferredAmount: amount,
    });

    campaign.amountContributed += Number(amount);
    await donor.setCampaigns(campaign);
    await campaign.setDonors(donor);
    await donor.save();
    await campaign.save();
    res.json({ data: newDonation, donor: donor });
  }
}
export async function getDonations(req, res) {
  try {
    // const creator = await Creator.findAll()
    if (req.userRole === "admin") {
      const data = await Donations.findAll({
        include: Object.values(Donations.associations),
      });
      return res.json({ data: data });
    }
    const data = await Donations.findAll({
      include: Object.values(Donations.associations),
      where: {DonorID: req.roleId}
      // where: {[Op.or] : [{ DonorId: req.roleId }, {campaignId: {[Op.in] : } }]},
    }); 
    res.json({ data: data });
  } catch (error) {
    console.log(error);
  }
}
