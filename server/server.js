import express from "express";
import cors from "cors";

import { sequelize } from "./models/index.js";

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


app.listen(5000, () => console.log("Server running 🚀"));