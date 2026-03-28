import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
  title: String,
  boardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Board",
  },
  position: Number,
});

export default mongoose.model("List", listSchema);