import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Card = sequelize.define("Card", {
  title: DataTypes.STRING,
  listId: DataTypes.INTEGER,
  position: DataTypes.INTEGER,
});

export default Card;