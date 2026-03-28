
import List from "../models/List.js";

export const createList = async (req, res) => {
  const { title, boardId } = req.body;

  const listsCount = await List.countDocuments({ boardId });

  const list = await List.create({
    title,
    boardId,
    position: listsCount,
  });

  res.json(list);
};

export const getLists = async (req, res) => {
  const lists = await List.find({ boardId: req.params.boardId }).sort("position");
  res.json(lists);
};