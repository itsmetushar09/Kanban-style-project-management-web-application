import express from "express";
import { createList, getLists } from "../controllers/listController.js";

const router = express.Router();

router.post("/", createList);
router.get("/:boardId", getLists);

export default router;