import Donations from "../models/donations.js";
import Donor from "../models/donor.js";
import Campaign from "../models/campaignModel.js";
import Creator from "../models/Creator.models.js";
import User from "../models/User.models.js";

export async function createDonation(req, res) {
  const { amount, campaignId } = req.body;
  const donor = await Donor.findByPk(req.user.roleId);
  console.log(req.body);
  const campaign = await Campaign.findByPk(campaignId);
  try {
    if (campaign) {
      const data = await Donations.create({
        DonorId: req.user.roleId,
        CampaignId: campaignId,
        transferredAmount: amount,
      });
      if (data) {
        donor.balance -= Number(amount);
        donor.numberOfContribution += 1;
        donor.amountPaid = donor.amountPaid + Number(amount);
        campaign.amountContributed += Number(amount);

        await donor.save();
        await campaign.save();
        res.json({ data: data, donor: donor });
      }
    } else {
      res.json({ message: `No Campaign found with the id ${campaignId}` });
    }
  } catch (error) {
    console.log(error);
  }
}
export async function getDonations(req, res) {
  try {
    const data = await Donations.findAll({
      include: [
        {
          model: Campaign,

          include: [
            {
              model: Creator,
              include: [{ model: User, attributes: ["firstName", "lastName"] }],
            },
          ],
        },
        { model: Donor, include: User },
      ],
    });
    return res.json({ data: data });
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
    console.log(req.roleId);
    console.log(data);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(501).json({ message: "Internal server error" });
  }
}


export async function getDonationsByDonor(req, res) {
  try {
    const donorId = req.params.donorId; // Assuming the donor ID is passed as a parameter

    const data = await Donations.findAll({
      include: [
        {
          model: Campaign,
          include: [
            {
              model: Creator,
              include: [{ model: User, attributes: ["firstName", "lastName"] }],
            },
          ],
        },
        { model: Donor, where: { id: donorId }, include: User },
      ],
    });

    return res.json({ data: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

