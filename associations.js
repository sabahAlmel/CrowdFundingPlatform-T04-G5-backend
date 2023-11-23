import User from "./models/User.models.js";
import Creator from "./models/Creator.models.js";
import Campaign from "./models/campaignModel.js";
import Donor from "./models/donor.js";
import Donations from "./models/donations.js";
import sequelize from "./config/dbConnection.js";

Creator.hasOne(User);
User.belongsTo(Creator);
Donor.belongsToMany(Campaign, { through: Donations, foreignKey: "DonorId" });
Campaign.belongsToMany(Donor, { through: Donations, foreignKey: "CampaignId" });

Donor.hasOne(User, {foreignKey: 'DonorId'});
User.belongsTo(Donor, {foreignKey:'DonorId'});

