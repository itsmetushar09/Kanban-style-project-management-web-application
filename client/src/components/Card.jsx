import { useDraggable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
function Card({ card }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: card.id,
     data: {
    listId: card.listId, 
     },
  });
 
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

   return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white p-2 rounded-lg shadow mb-2 cursor-grab hover:shadow-md"
    >
      {card.title}
    </div>
  );
}

export default Card;

