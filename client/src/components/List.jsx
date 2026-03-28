import { useEffect, useState } from "react";
import API from "../services/api";
import Card from "./Card";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
function List({ list }) {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await API.get(`/cards/${list._id}`);
        setCards(res.data);
      } catch (err) {
        console.error("Error fetching cards", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, [list._id]);

  return (
    <div className="bg-gray-100 w-72 p-3 rounded-xl shadow-md">
      <h2 className="font-semibold mb-3 text-gray-700">
        {list.title}
      </h2>

      <SortableContext
        items={cards.map((c) => c._id)}
        strategy={verticalListSortingStrategy}
      >
        {loading ? (
          <p className="text-sm text-gray-400">Loading...</p>
        ) : cards.length === 0 ? (
          <p className="text-sm text-gray-400">No cards yet</p>
        ) : (
          cards.map((card) => (
            <Card key={card._id} card={card} />
          ))
        )}
      </SortableContext>

      <button className="mt-2 text-sm text-gray-600 hover:text-black">
        + Add Card
      </button>
    </div>
  );
}
export default List;