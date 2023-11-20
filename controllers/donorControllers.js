import Donor from "../models/DonorModel.js";

export async function addDonor(req, res) {
  const { balance } = req.body;
  console.log(req.body);
  try {
    const data = await Donor.create({ balance: balance });
    res.json({ data: data.toJSON() });
  } catch (error) {
    console.log(error);
  }
}
export async function editDonor(req, res) {
  const { donorId, balance, amountPaid } = req.body;

  try {
    const donor = await Donor.findOne({ where: { id: donorId } });
    donor.set({
      balance: balance || donor.balance - amountPaid,
      amountPaid: amountPaid || donor.amountPaid,
      numberOfContribution: !balance ? donor.numberOfContribution + 1 : donor.numberOfContribution,
    });
    await donor.save();
    res.json({
      message: `user with the id ${donorId} is updated `,
      donor: donor.toJSON(),
    });
  } catch (error) {
    console.log(error);
  }
}
export async function readDonors(req, res){
    try {
        const response = await Donor.findAll()
        res.json({data: response})
    } catch (error) {
        
    }
}
