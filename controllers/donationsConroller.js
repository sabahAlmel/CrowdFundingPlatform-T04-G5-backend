import { where } from "sequelize";
import Donations from "../models/DonationModel.js";
import Donor from "../models/DonorModel.js";

export async function createDonation(req, res) {
  const { donorId, amount } = req.body;
  let donor = await Donor.findOne({ where: { id: donorId } });
  donor = {
      ...donor,
      balance: donor.balance - amount,
      numberOfContribution: donor.numberOfContribution + 1,
      amountPaid: donor.amountPaid + amount,
    };
    const newDonation = await Donations.create({
      transferredAmount: amount,
    }, {include: Donor});
//   await donor.save()
    // await donor.save()
  newDonation.setDonor(donor);
  await newDonation.save();
  res.json({ data: newDonation });
}
