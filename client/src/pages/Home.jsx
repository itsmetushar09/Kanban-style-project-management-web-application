import { useEffect, useState } from "react";
import API from "../services/api";
import Board from "../components/Board";

function Home() {
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const res = await API.get("/boards");

        setBoards(res.data);

        if (res.data.length > 0) {
          setSelectedBoard(res.data[0].id);
        }
      } catch (err) {
        console.error("Error fetching boards:", err);
        setError("Failed to load boards ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchBoards();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* 🔷 Header */}
      <div className="p-4 backdrop-blur-md bg-white/60 border-b border-white/40 shadow-sm flex gap-3 overflow-x-auto animate-fadeIn">
        {boards.map((b) => (
          <button
            key={b.id}
            onClick={() => setSelectedBoard(b.id)}
            className={`
              px-4 py-2 rounded-xl text-sm font-medium
              transition-all duration-200 whitespace-nowrap
              
              ${
                selectedBoard === b.id
                  ? "bg-blue-600 text-white shadow-md scale-[1.05]"
                  : "bg-white/70 hover:bg-white shadow-sm hover:shadow-md"
              }
            `}
          >
            {b.title}
          </button>
        ))}
      </div>

      {/* 🔹 Content */}
      <div className="p-6 animate-fadeIn">
        {/* ⏳ Loading */}
        {loading && (
          <div className="text-gray-500 animate-pulse">Loading boards...</div>
        )}

        {/* ❌ Error */}
        {error && (
          <div className="text-red-500 bg-red-100 px-4 py-2 rounded-lg w-fit">
            {error}
          </div>
        )}

        {/* 🚫 Empty */}
        {!loading && boards.length === 0 && (
          <div className="text-gray-400 text-lg">No Boards Found 😔</div>
        )}

        {/* 📋 Board */}
        {!loading && selectedBoard && (
          <div className="mt-4">
            <Board boardId={selectedBoard} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;