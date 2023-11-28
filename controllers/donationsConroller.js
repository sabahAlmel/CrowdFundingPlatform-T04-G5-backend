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
  
  campaign.amountContributed += Number(amount);

  if (campaign) {
    const existingDonation = await Donations.findOne({where : {[Op.and] : [{DonorId: req.roleId},{CampaignId: campaignId}]}})
    if(existingDonation){
      existingDonation.transferredAmount += Number(amount)
      existingDonation.save()
      return res.json({data: existingDonation})
    }else{
      await donor.setCampaigns(campaign, {through:{ transferredAmount: amount}});
    }
    

    await donor.save();
    await campaign.save();
    res.json({ donor: donor });
  }
}
export async function getDonations(req, res) {
  try {
    if (req.userRole === "admin") {
      const data = await Donations.findAll({
        include: Object.values(Donations.associations),
      });
      return res.json({ data: data });
    }
    const data = await Donor.findAll({
      include: [{model: Campaign, through: Donations }],
      where: {id: req.roleId}
    }); 
    res.json({ data: data });
  } catch (error) {
    console.log(error);
  }
}

// newCreator1
// createrPassword1


export async function getDonationsByCreatorId(req, res) {
  try {
    const data = await Donations.findAll({
      include: [
        {
          model: Campaign,
          where: {
            CreatorId: req.roleId,
          },
        },
      ],
    });
    console.log(req.roleId)
    console.log(data)
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(501).json({ message: "Internal server error" });
  }
}

