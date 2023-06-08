import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import formData from "express-form-data";

import connectDB from "./mongodb/connect.js";

import heroRoutes from "./routes/heroRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(formData.parse());
app.use(express.json({ limit: "100mb" }));
app.use("/api/v1/hero", heroRoutes);

app.get("/", async (req, res) => {
  res.send("Hello from HeroPedia API!");
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () => console.log("Server has started on port 8080"));
  } catch (e) {
    console.log(e);
  }
};

startServer();
