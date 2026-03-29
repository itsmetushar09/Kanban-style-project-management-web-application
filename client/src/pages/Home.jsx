import { useEffect, useState } from "react";
import API from "../services/api";
import Board from "../components/Board";

function Home() {
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const res = await API.get("/boards");
        setBoards(res.data);

        // auto select first board (better UX)
        if (res.data.length > 0) {
          setSelectedBoard(res.data[0].id);
          console.log("Boards:", boards);
        }
      } catch (err) {
        console.log("Error fetching boards", err);
      }
    };

    fetchBoards();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      
      {/* Header */}
      <div className="p-4 bg-white shadow flex gap-3 overflow-x-auto">
        {boards.map((b) => (
          <button
            key={b.id}
            onClick={() => setSelectedBoard(b.id)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              selectedBoard === b.id
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {b.title}
          </button>
        ))}
      </div>

      {/* Board View */}
      {selectedBoard ? (
        <Board boardId={selectedBoard} />
      ) : (
        <div className="p-5 text-gray-500">No Board Found</div>
      )}
    </div>
  );
}

export default Home;