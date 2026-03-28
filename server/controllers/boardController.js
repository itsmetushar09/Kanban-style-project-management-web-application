import Board from "../models/Board.js";

// create board
export const createBoard = async (req, res) => {
  const { title } = req.body;
  const board = await Board.create({ title });
  res.json(board);
};

// get all boards
export const getBoards = async (req, res) => {
  const boards = await Board.find();
  res.json(boards);
};