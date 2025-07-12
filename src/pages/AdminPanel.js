import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminPanel() {
  const [pendingItems, setPendingItems] = useState([]);
  const [allItems, setAllItems] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get("http://localhost:5000/api/items/pending", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => setPendingItems(res.data))
      .catch(err => console.error("Pending fetch error:", err));

    axios.get("http://localhost:5000/api/items", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => setAllItems(res.data))
      .catch(err => console.error("All items fetch error:", err));
  }, []);

  const handleDecision = async (id, approve) => {
    const token = localStorage.getItem("token");

    try {
      await axios.put(`http://localhost:5000/api/items/approve/${id}`,
        { approve },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert(approve ? "Approved" : "Rejected");
      setPendingItems(prev => prev.filter(item => item._id !== id));
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update");
    }
  };

  const getImageUrl = (item) => {
    if (item.imageUrl && item.imageUrl.startsWith("/uploads/")) {
      return `http://localhost:5000${item.imageUrl}`;
    }
    return "https://via.placeholder.com/120?text=No+Image";
  };

return (
  <div className="min-h-screen bg-gray-100 py-10 px-2">
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-8 text-indigo-700 tracking-wide">Admin Panel - Pending Items</h2>
      <div className="grid gap-6">
        {pendingItems.length === 0 ? (
          <p className="text-center text-gray-500">No pending items.</p>
        ) : (
          pendingItems.map(item => (
            <div key={item._id} className="bg-white rounded-xl shadow p-5 flex flex-col md:flex-row items-center gap-6 border border-gray-200">
              <img
                src={getImageUrl(item)}
                alt={item.title}
                className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                onError={e => { e.target.src = "https://via.placeholder.com/120?text=No+Image"; }}
              />
              <div className="flex-1 w-full">
                <h4 className="text-lg font-semibold text-gray-800 mb-1">{item.title}</h4>
                <p className="text-gray-600 mb-1">{item.description}</p>
                <p className="text-sm text-gray-500 mb-2"><span className="font-medium">Uploaded by:</span> {item.uploader?.name || "Unknown"}</p>
                <div className="flex gap-3 mt-2">
                  <button
                    onClick={() => handleDecision(item._id, true)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold shadow"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleDecision(item._id, false)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold shadow"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <h2 className="text-2xl font-bold text-center mt-14 mb-8 text-indigo-700 tracking-wide">All Items Added by Users</h2>
      <div className="grid gap-6">
        {allItems.length === 0 ? (
          <p className="text-center text-gray-500">No items found.</p>
        ) : (
          allItems.map(item => (
            <div key={item._id} className="bg-white rounded-xl shadow p-5 flex flex-col md:flex-row items-center gap-6 border border-gray-200">
              <img
                src={getImageUrl(item)}
                alt={item.title}
                className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                onError={e => { e.target.src = "https://via.placeholder.com/80?text=No+Image"; }}
              />
              <div className="flex-1 w-full">
                <h4 className="text-lg font-semibold text-gray-800 mb-1">{item.title}</h4>
                <p className="text-gray-600 mb-1">{item.description}</p>
                <p className="text-sm text-gray-500 mb-1"><span className="font-medium">Status:</span> {item.status}</p>
                <p className="text-sm text-gray-500"><span className="font-medium">Uploaded by:</span> {item.uploader?.name || "Unknown"}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  </div>
);
}

export default AdminPanel;
