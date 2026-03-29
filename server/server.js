import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

// import { sequelize } from "./models/index.js";
import sequelize from "./config/db.js";

try {
  await sequelize.authenticate();
  console.log("DB Connected ✅");
} catch (err) {
  console.error("DB Connection Failed ❌", err);
}

import boardRoutes from "./routes/boardRoutes.js";
import listRoutes from "./routes/listRoutes.js";
import cardRoutes from "./routes/cardRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Sync MySQL tables
await sequelize.sync({ alter: true });

app.use("/api/boards", boardRoutes);
app.use("/api/lists", listRoutes);
app.use("/api/cards", cardRoutes);
app.get("/", (req, res) => {
  res.send("🚀 Backend is live");
});


app.listen(5000, () => console.log("Server running 🚀"));