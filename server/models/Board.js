import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Board = sequelize.define("Board", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Board;