
import express from "express";

import cors from "cors";
import connectDB from "./config/db.js";


import boardRoutes from "./routes/boardRoutes.js";
import listRoutes from "./routes/listRoutes.js";
import cardRoutes from "./routes/cardRoutes.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/boards", boardRoutes);




app.use("/api/lists", listRoutes);
app.use("/api/cards", cardRoutes);

connectDB();

app.get("/", (req, res) => {
  res.send("API Running ");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});