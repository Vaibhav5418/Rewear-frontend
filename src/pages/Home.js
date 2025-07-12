import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/items")
      .then((res) => setItems(res.data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const handleItemClick = (id) => {
    navigate(`/item/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-2">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-indigo-700 mb-8 text-center tracking-wide">Uploaded Items</h2>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold shadow"
          >
            Go to Dashboard
          </button>
          <button
            onClick={() => navigate("/add-item")}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold shadow"
          >
            Add New Item
          </button>
        </div>

        {/* Item List */}
        <div className="flex flex-wrap gap-8 justify-center">
          {items.length === 0 ? (
            <p className="text-gray-500 text-center w-full">No items uploaded yet.</p>
          ) : (
            items.map((item) => (
              <div
                key={item._id}
                className="border border-gray-200 rounded-xl p-4 bg-white flex flex-col items-center w-56 shadow cursor-pointer hover:shadow-lg transition"
                onClick={() => handleItemClick(item._id)}
              >
                <img
                  src={`http://localhost:5000${item.imageUrl}`}
                  alt={item.title}
                  className="w-36 h-36 object-cover rounded mb-2 border border-gray-200"
                  onError={e => { e.target.src = "https://via.placeholder.com/150?text=No+Image"; }}
                />
                <h4 className="font-semibold text-gray-800 text-center mt-2">{item.title}</h4>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
