import { where } from "sequelize";
import Donations from "../models/donations.js";
import Donor from "../models/donor.js";

export async function createDonation(req, res) {
  const { donorId, amount } = req.body;
  let donor = req.donor
  console.log(req.donor)
  donor.balance = donor.balance - amount;
  donor.numberOfContribution = donor.numberOfContribution + 1;
  donor.amountPaid = donor.amountPaid + Number(amount);

    const newDonation = await Donations.create({
      transferredAmount: amount,
      DonorId: donorId
    });
    await donor.save()
  await newDonation.save(); 
  res.json({ data: newDonation, donor: donor });
}
export async function getDonations(req, res){
  try {
    const data = await Donations.findAll({include: 'Donor'})
    res.json({data: data})
  } catch (error) {
    console.log(error)
  }
}