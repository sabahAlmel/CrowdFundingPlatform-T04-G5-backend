import User from "./models/User.models.js";
import Creator from "./models/Creator.models.js";
import Campaign from "./models/campaignModel.js";
import Donor from "./models/donor.js";
import Donations from "./models/donations.js";
import Category from "./models/categoryModel.js";
import sequelize from "./config/dbConnection.js";
// import Category from "./models/categoryModel.js"

User.hasOne(Creator, { onDelete: "CASCADE" });
Creator.belongsTo(User);
Donor.belongsToMany(Campaign, { through: Donations, foreignKey: "DonorId" });
Campaign.belongsToMany(Donor, { through: Donations, foreignKey: "CampaignId" });

Category.hasMany(Campaign, { onDelete: "CASCADE" });
Campaign.belongsTo(Category);

Creator.hasMany(Campaign, { onDelete: "CASCADE" });
Campaign.belongsTo(Creator);

User.hasOne(Donor, { foreignKey: "UserId", onDelete: "CASCADE" });
Donor.belongsTo(User, { foreignKey: "UserId", onDelete: "CASCADE" });

// await User.sync({alter: true})
// await Donor.sync({alter: true})
// await sequelize.sync({alter:true})
