import express from "express";
import "dotenv/config";
import sequelize from "./config/dbConnection.js";
import cors from "cors";
import "./associations.js";
import { userRouter } from "./routes/user.routes.js";
import {campaignRouter} from './routes/campaignRoutes.js';
import { categoryRouter } from "./routes/categoryRoutes.js";

const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors());
try {
  await sequelize.authenticate();
  console.log("Connection established");
} catch (error) {
  console.log("Unable to connect to database");
}

app.use("/users", userRouter);
app.use('/campaigns', campaignRouter);
app.use('/categories',categoryRouter)

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
