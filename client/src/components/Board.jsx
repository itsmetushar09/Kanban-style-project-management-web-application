import { DndContext } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import API from "../services/api";
import List from "./List";

function Board({ boardId }) {
  const [lists, setLists] = useState([]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const listRes = await API.get(`/lists/${boardId}`);
      setLists(listRes.data);

      // fetch cards for all lists
      let allCards = [];
      for (let l of listRes.data) {
        const res = await API.get(`/cards/${l.id}`);
        allCards.push(...res.data);
      }
      setCards(allCards);
    };

    fetchData();
  }, [boardId]);

  const handleDragEnd = async ({ active, over }) => {
  if (!over) return;

  const cardId = Number(active.id);

  let listId;

  if (over.data?.current?.listId) {
    listId = over.data.current.listId;
  } else {
    listId = Number(over.id);
  }

  if (!cardId || !listId) return;

  // 🔥 1. UPDATE UI INSTANTLY (IMPORTANT)
  setCards((prev) =>
    prev.map((card) =>
      card.id === cardId
        ? { ...card, listId }
        : card
    )
  );

  // 🔥 2. UPDATE BACKEND
  try {
    await API.put("/cards/move", {
      cardId,
      listId,
    });
  } catch (err) {
    console.error("Move failed:", err);
  }
};
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex gap-4 p-4 overflow-x-auto">
        {lists.map((list) => (
          <List
            key={list.id}
            list={list}
            cards={cards.filter((c) => c.listId === list.id)}
          />
        ))}
      </div>
    </DndContext>
  );
}

export default Board;