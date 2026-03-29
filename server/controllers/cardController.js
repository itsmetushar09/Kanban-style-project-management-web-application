import { Card } from "../models/index.js";

// ✅ Create Card
export const createCard = async (req, res) => {
  try {
    const { title, listId } = req.body;

    if (!title || !listId) {
      return res.status(400).json({ msg: "Title and listId required" });
    }

    const parsedListId = Number(listId);

    const count = await Card.count({
      where: { listId: parsedListId },
    });

    const card = await Card.create({
      title,
      listId: parsedListId,
      position: count,
    });

    res.json(card);
  } catch (err) {
    console.error("Create card error:", err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get Cards
export const getCards = async (req, res) => {
  try {
    const listId = Number(req.params.listId);

    const cards = await Card.findAll({
      where: { listId },
      order: [["position", "ASC"]],
    });

    res.json(cards);
  } catch (err) {
    console.error("Get cards error:", err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Move Card (FIXED)
export const moveCard = async (req, res) => {
  try {
    let { cardId, listId } = req.body;

    // 🔥 Convert to number (VERY IMPORTANT)
    cardId = Number(cardId);
    listId = Number(listId);

    if (!cardId || !listId) {
      return res.status(400).json({ msg: "Invalid cardId or listId" });
    }

    // 🔍 Find card
    const card = await Card.findByPk(cardId);

    if (!card) {
      return res.status(404).json({ msg: "Card not found" });
    }

    // 📊 Count cards in new list
    const count = await Card.count({
      where: { listId },
    });

    // 🔄 Update
    card.listId = listId;
    card.position = count;

    await card.save();

    res.json(card);
  } catch (err) {
    console.error("MOVE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};