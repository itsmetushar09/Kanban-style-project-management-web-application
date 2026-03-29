import { useState } from "react";
import API from "../services/api";
import Card from "./Card";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";

function List({ list, cards, setCards }) {
  const [showInput, setShowInput] = useState(false);
  const [title, setTitle] = useState("");

  // 🔥 Make list DROPPABLE
  const { setNodeRef } = useDroppable({
    id: list.id,
  });

  const handleAddCard = async () => {
    if (!title.trim()) return;

    try {
      const res = await API.post("/cards", {
        title,
        listId: list.id,
      });

      setCards((prev) => [...prev, res.data]);

      setTitle("");
      setShowInput(false);
    } catch (err) {
      console.error("Add card error", err);
    }
  };

  return (
    <div
      ref={setNodeRef}
      className="bg-gray-100 w-72 p-3 rounded-xl shadow-md min-h-[150px]"
    >
      <h2 className="font-semibold mb-3">{list.title}</h2>

      {/* 🔥 DRAG ENABLED */}
      <SortableContext
        items={cards.map((c) => c.id)}
        strategy={verticalListSortingStrategy}
      >
        {cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </SortableContext>

      {/* Add Card UI */}
      {showInput ? (
        <div>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter card title..."
            className="w-full p-2 border rounded mb-2"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddCard();
            }}
          />

          <button
            onClick={handleAddCard}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Add
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowInput(true)}
          className="mt-2 text-sm text-gray-600 hover:text-black"
        >
          + Add Card
        </button>
      )}
    </div>
  );
}

export default List;