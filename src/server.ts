import express from "express";
import cors from "cors";
import StadiumsPurchaseSubscription from "./subscriptions/NewStadiumPurchase";
import stadiumsRoutes from "./routes/stadiums.routes";
import connectDB from "./config/database";
const app = express();

StadiumsPurchaseSubscription();

connectDB();

app.use(express.json());
app.use(cors());
app.use("/stadiums", stadiumsRoutes);

export default app;
