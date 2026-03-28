import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  title: String,
  description: String,
  listId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "List",
  },
  position: Number,
});

const Card = mongoose.model("Card", cardSchema);

export default Card;