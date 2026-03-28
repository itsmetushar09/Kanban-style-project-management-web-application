import { DndContext } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import API from "../services/api";
import List from "./List";

function Board({ boardId }) {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    if (!boardId) return;

    const fetchLists = async () => {
      try {
        const res = await API.get(`/lists/${boardId}`);
        setLists(res.data);
      } catch (err) {
        console.log("Error fetching lists", err);
      }
    };

    fetchLists();
  }, [boardId]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    console.log("Board ID:", boardId);
    console.log("Dragged:", active.id);
    console.log("Dropped on:", over.id);
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex gap-4 overflow-x-auto p-4 items-start">
        {lists.map((list) => (
          <List key={list._id} list={list} />
        ))}
      </div>
    </DndContext>
  );
}

export default Board;