import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const List = sequelize.define("List", {
  title: DataTypes.STRING,
  boardId: DataTypes.INTEGER,
  position: DataTypes.INTEGER,
});

export default List;