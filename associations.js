import User from "./models/User.models.js";
import Creator from "./models/Creator.models.js";
import Campaign from "./models/campaignModel.js";
import Donor from "./models/donor.js";
import Donations from "./models/donations.js";
import sequelize from "./config/dbConnection.js";
import Category from "./models/categoryModel.js"

User.hasOne(Creator);
Creator.belongsTo(User);
Donor.belongsToMany(Campaign, { through: Donations, foreignKey: "DonorId" });
Campaign.belongsToMany(Donor, { through: Donations, foreignKey: "CampaignId" });

Donor.hasOne(User);
User.belongsTo(Donor);

Category.hasMany(Campaign);  
Campaign.belongsTo(Category);


Creator.hasMany(Campaign);  
Campaign.belongsTo(Creator);

// await sequelize.sync({alter: true})

