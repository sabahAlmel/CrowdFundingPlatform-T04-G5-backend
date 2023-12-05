import express, { urlencoded } from "express";
import "dotenv/config";
import sequelize from "./config/dbConnection.js";
import cors from "cors";
import "./associations.js";
import { userRouter } from "./routes/user.routes.js";
import { campaignRouter } from "./routes/campaignRoutes.js";
import { categoryRouter } from "./routes/categoryRoutes.js";
import donorRouter from "./routes/donorRoutes.js";
import donationRouter from "./routes/donationRoute.js";
import cookieParser from "cookie-parser";
import { signIn } from "./controllers/loginController.js";
import { authorize, logOut } from "./middlewares/auth.js";
import "./models/notificationModel.js";

const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200,
  })
);
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
try {
  await sequelize.authenticate();
  console.log("Connection established");
} catch (error) {
  console.log("Unable to connect to database");
}
app.use("/public/images", express.static("public/images"));
app.use("/users", userRouter);
app.use("/campaigns", campaignRouter);
app.use("/categories", categoryRouter);
app.use("/donors", donorRouter);
app.use("/donations", donationRouter);
app.get("/login", signIn);
app.get("/protected", authorize, (req, res) => {
  return res.json({ user: { id: req.userId, role: req.userRole } });
});
app.get("/logout", logOut);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
