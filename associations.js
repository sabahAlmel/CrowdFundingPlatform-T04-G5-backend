import User from "./models/User.models.js";
import Creator from "./models/Creator.models.js";
Creator.hasOne(User);
await User.sync({ alter: true });
User.belongsTo(Creator);
await Creator.sync({ alter: true });
