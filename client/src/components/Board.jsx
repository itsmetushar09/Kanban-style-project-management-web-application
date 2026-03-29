import { DndContext } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import API from "../services/api";
import List from "./List";

function Board({ boardId }) {
  const [lists, setLists] = useState([]);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const listRes = await API.get(`/lists/${boardId}`);
        setLists(listRes.data);

        const cardPromises = listRes.data.map((l) =>
          API.get(`/cards/${l.id}`)
        );

        const results = await Promise.all(cardPromises);
        const allCards = results.flatMap((res) => res.data);

        setCards(allCards);
      } catch (err) {
        console.error("Error loading board:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [boardId]);

  // Drag logic
  const handleDragEnd = async ({ active, over }) => {
    if (!over) return;

    const cardId = Number(active.id);

    let listId;

    if (over.data?.current?.listId) {
      listId = Number(over.data.current.listId);
    } else {
      listId = Number(over.id);
    }

    if (!cardId || !listId) return;

    const prevCards = [...cards];

    // Optimistic UI
    setCards((prev) =>
      prev.map((card) =>
        card.id === cardId ? { ...card, listId } : card
      )
    );

    try {
      await API.put("/cards/move", {
        cardId,
        listId,
      });
    } catch (err) {
      console.error("Move failed:", err);
      setCards(prevCards); // rollback
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="flex gap-6 p-6 overflow-x-auto">

          {loading && (
            <div className="text-gray-500 text-lg animate-pulse">
              Loading board...
            </div>
          )}

          {!loading &&
            lists.map((list) => (
              <List
                key={list.id}
                list={list}
                cards={cards.filter((c) => c.listId === list.id)}
                setCards={setCards}
              />
            ))}

          {!loading && lists.length === 0 && (
            <div className="text-gray-400 text-lg">
              No lists found 😔
            </div>
          )}
        </div>
      </div>
    </DndContext>
  );
}

export default Board;