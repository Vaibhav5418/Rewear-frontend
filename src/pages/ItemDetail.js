import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/items/${id}`);
        setItem(res.data);
      } catch (err) {
        console.error("Failed to fetch item:", err);
        alert("Item not found or server error.");
        navigate("/home");
      }
    };
    fetchItem();
  }, [id, navigate]);

  const handleAction = async (type) => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("You must be logged in to perform this action.");
    navigate("/login");
    return;
  }

  try {
    const res = await axios.post(
      `http://localhost:5000/api/items/swap/${id}`,
      { type },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (type === "swap") {
      alert(`Swap successful! You gained ${res.data.buyerPoints} points.`);
    } else if (type === "redeem") {
      alert(`Redeem successful! ${res.data.pointsDeducted} points deducted.`);
    }

    navigate("/dashboard");
  } catch (err) {
    console.error("Swap/Redeem error:", err.response || err);
    const message = err.response?.data?.message || "Action failed. Please try again.";
    alert("Error: " + message);
  }
};

  if (!item) return <p className="text-center text-gray-500 mt-10">Loading item...</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-2 flex justify-center items-start">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-xl">
        <button
          onClick={() => navigate("/home")}
          className="mb-6 text-indigo-600 hover:underline flex items-center gap-1"
        >
          <span className="text-lg">⬅</span> Back
        </button>

        <h2 className="text-2xl font-bold text-indigo-700 mb-4 text-center">{item.title}</h2>
        <div className="flex flex-col items-center mb-6">
          <img
            src={`http://localhost:5000${item.imageUrl}`}
            alt={item.title}
            className="w-72 h-72 object-cover rounded-lg border border-gray-200 mb-3"
            onError={e => { e.target.src = "https://via.placeholder.com/300?text=No+Image"; }}
          />
        </div>
        <div className="space-y-2 text-gray-700">
          <p><span className="font-semibold">Description:</span> {item.description}</p>
          <p><span className="font-semibold">Category:</span> {item.category}</p>
          <p><span className="font-semibold">Type:</span> {item.type}</p>
          <p><span className="font-semibold">Size:</span> {item.size}</p>
          <p><span className="font-semibold">Condition:</span> {item.condition}</p>
          <p><span className="font-semibold">Status:</span> {item.status}</p>
          <p><span className="font-semibold">Tags:</span> {item.tags?.join(", ") || "None"}</p>
        </div>

        {item.uploader && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <h4 className="font-semibold text-gray-800 mb-1">Uploaded By:</h4>
            <p><span className="font-semibold">Name:</span> {item.uploader.name}</p>
            <p><span className="font-semibold">Email:</span> {item.uploader.email}</p>
          </div>
        )}

        {item.status === "available" && item.isApproved && (
          <div className="flex gap-4 mt-8">
            <button
              onClick={() => handleAction("swap")}
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold shadow"
            >
              Swap Request
            </button>
            <button
              onClick={() => handleAction("redeem")}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold shadow"
            >
              Redeem via Points
            </button>
          </div>
        )}

        {item.status !== "available" && (
          <p className="text-center text-gray-500 mt-8">
            This item is no longer available for swap or redeem.
          </p>
        )}
      </div>
    </div>
  );
}

export default ItemDetail;
