import express from "express";
import { createBoard, getBoards } from "../controllers/boardController.js";

const router = express.Router();

router.post("/", createBoard);
router.get("/", getBoards);

export default router;