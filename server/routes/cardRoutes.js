import express from "express";
import { createCard, getCards } from "../controllers/cardController.js";
import { moveCard } from "../controllers/cardController.js";
const router = express.Router();

router.post("/", createCard);
router.get("/:listId", getCards);
router.put("/move", moveCard);
export default router;