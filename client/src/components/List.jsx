import Card from "./Card";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";

function List({ list, cards }) {
  // ✅ Droppable area
  const { setNodeRef } = useDroppable({
    id: list.id,
  });

  return (
    <div
      ref={setNodeRef}
      className="bg-gray-100 w-72 p-3 rounded-xl shadow-md min-h-[120px]"
    >
      <h2 className="font-semibold mb-3 text-gray-700">
        {list.title}
      </h2>

      <SortableContext
        items={cards.map((c) => c.id)}
        strategy={verticalListSortingStrategy}
      >
        {cards.length === 0 ? (
          <p className="text-sm text-gray-400">No cards yet</p>
        ) : (
          cards.map((card) => (
            <Card key={card.id} card={card} />
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