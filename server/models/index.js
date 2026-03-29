import sequelize from "../config/db.js";
import Board from "./Board.js";
import List from "./List.js";
import Card from "./Card.js";

// Relations
Board.hasMany(List, { foreignKey: "boardId" });
List.belongsTo(Board, { foreignKey: "boardId" });

List.hasMany(Card, { foreignKey: "listId" });
Card.belongsTo(List, { foreignKey: "listId" });

export { sequelize, Board, List, Card };