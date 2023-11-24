import express, { urlencoded } from "express";
import "dotenv/config";
import sequelize from "./config/dbConnection.js";
import cors from "cors";
import Donor from "./models/donor.js";
import Donations from "./models/donations.js";
// import authRouter from "./routes/auth.routes.js";
import "./associations.js";
import { userRouter } from "./routes/user.routes.js";
import { campaignRouter } from "./routes/campaignRoutes.js";
import { categoryRouter } from "./routes/categoryRoutes.js";
import donorRouter from "./routes/donorRoutes.js";
import donationRouter from "./routes/donationRoute.js";
// import { requireAuth, checkUser } from "./middlewares/auth.js";
import cookieParser from "cookie-parser";
// import { signIn } from "./controllers/auth.controllers.js";

const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors());
app.use(urlencoded({ extended: true }));

try {
  await sequelize.authenticate();
  console.log("Connection established");
} catch (error) {
  console.log("Unable to connect to database");
}
app.use(cookieParser());
app.use("/users", userRouter);
app.use("/campaigns", campaignRouter);
app.use("/categories", categoryRouter);
app.use("/donors", donorRouter);
app.use("/donations", donationRouter);
// app.use(authRouter);
// app.post("/signin", signIn);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
