import Card from "../models/Card.js";

export const createCard = async (req, res) => {
  const { title, listId } = req.body;

  const count = await Card.countDocuments({ listId });

  const card = await Card.create({
    title,
    listId,
    position: count,
  });

  res.json(card);
};

export const getCards = async (req, res) => {
  const cards = await Card.find({ listId: req.params.listId }).sort("position");
  res.json(cards);
};