import Donor from "../models/donor.js";

export async function checkBalance(req, res, next) {
  const donor = await Donor.findByPk(req.roleId);
  if (req.body.amount > donor.balance){
    res.status(401).send("You don't have this amount in your account")
  }else{
    next()
  }
}
