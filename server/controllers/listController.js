import { List } from "../models/index.js";

// GET LISTS
export const getLists = async (req, res) => {
  try {
    const boardId = Number(req.params.boardId);

    const lists = await List.findAll({
      where: { boardId },
      order: [["position", "ASC"]],
    });

    res.json(lists);
  } catch (err) {
    console.error("List fetch error:", err);
    res.status(500).json({ error: "Failed to fetch lists" });
  }
};

// CREATE LIST
export const createList = async (req, res) => {
  try {
    const { title, boardId } = req.body;

    const count = await List.count({
      where: { boardId },
    });

    const list = await List.create({
      title,
      boardId,
      position: count,
    });

    res.json(list);
  } catch (err) {
    console.error("Create list error:", err);
    res.status(500).json({ error: "Failed to create list" });
  }
};