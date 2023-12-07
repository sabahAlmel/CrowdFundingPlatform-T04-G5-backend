import User from "../models/User.models.js";
import Campaign from "../models/campaignModel.js";
import Donations from "../models/donations.js";
import Donor from "../models/donor.js";

export async function addDonor(req, res) {
  const { balance } = req.body;
  console.log(req.body);
  try {
    const data = await Donor.create({ balance: balance ? balance : 0 });
    res.json({ data: data.toJSON() });
  } catch (error) {
    console.log(error);
  }
}
export async function editDonor(req, res) {
  const { balance } = req.body;
  try {
    let donor = await Donor.findByPk(req.user.roleId);
    donor.balance += Number(balance);
    await donor.save();
    res.json({
      message: `user with the id ${req.user.roleId} is updated `,
      donor: donor,
    });
  } catch (error) {
    console.log(error);
  }
}
export async function readDonors(req, res) {
  try {
    const response = await Donor.findAll({
      include: [Donations, User],
      offset: req.offset,
      limit: req.limit,
    });
    return res.json({ data: response });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
}
