import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import router from "./router/carRouter.js";

dotenv.config(); // Load environment variables

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/mern"; 

// Debug print the connection string
console.log("Connecting to MongoDB at:", MONGOURL);

// Connect to MongoDB
mongoose.connect(MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log(`CONNECTED TO MONGO!`);
        app.listen(PORT, () => {
            console.log(`Connected to PORT ${PORT}...`);
        });
    })
    .catch((err) => {
        console.error(`OH NO! MONGO CONNECTION ERROR!`);
        console.error(err);
    });

// Use the router
app.use("/api", router);