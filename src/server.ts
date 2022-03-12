import express from "express";
import cors from "cors";
import server from "./config/server";
import StadiumsPurchaseSubscription from "./subscriptions/NewStadiumPurchase";
import stadiumsRoutes from "./routes/stadiums.routes";
const port = server.port;
const app = express();

app.use(express.json());
app.use(cors());
app.use("/stadiums", stadiumsRoutes);

StadiumsPurchaseSubscription();

export { port, app };
