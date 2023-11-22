import { where } from "sequelize";
import Donor from "../models/donor.js";

export async function checkBalance(req, res, next) {

  const donor = await Donor.findOne({ where: { id: req.body.donorId }});
  if (req.body.amount > donor.balance){
    res.status(401).send("You don't have this amount in your account")
  }else{
    req.donor = donor
    next()
  }
}
