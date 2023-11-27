import { where } from "sequelize";
import Donor from "../models/donor.js";

export async function checkBalance(req, res, next) {
  if(req.userRole !== 'donor'){
    return res.status(401).send('Not Auhtorized')
  }
  const donor = await Donor.findByPk(req.userId);
  if (req.body.amount > donor.balance){
    res.status(401).send("You don't have this amount in your account")
  }else{
    req.donor = donor.dataValues
    next()
  }
}
