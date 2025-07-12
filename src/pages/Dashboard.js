import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [myItems, setMyItems] = useState([]);
  const [swaps, setSwaps] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }

      try {
        const res = await axios.get("http://localhost:5000/api/auth/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);

        const itemsRes = await axios.get("http://localhost:5000/api/items/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMyItems(itemsRes.data);

        setSwaps([]); // Placeholder
      } catch (err) {
        alert("Unauthorized. Please log in again.");
        localStorage.removeItem("token");
        navigate("/");
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-2">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-indigo-700 mb-2 text-center">Welcome, {user.name} {user.role === "admin" && <span className="text-sm text-indigo-500">(Admin)</span>}</h2>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-6 text-gray-700 text-base">
          <span><span className="font-semibold">Email:</span> {user.email}</span>
          <span><span className="font-semibold">Role:</span> {user.role}</span>
          <span><span className="font-semibold">Points:</span> {user.points}</span>
        </div>

        <hr className="my-6" />
        <h3 className="text-lg font-semibold mb-3 text-indigo-600">My Uploaded Items</h3>
        {myItems.length === 0 ? (
          <p className="text-gray-500">No items uploaded yet.</p>
        ) : (
          <div className="flex flex-wrap gap-6">
            {myItems.map((item) => (
              <div key={item._id} className="border border-gray-200 rounded-lg p-4 bg-gray-50 flex flex-col items-center w-48 shadow-sm">
                <img
                  src={`http://localhost:5000${item.imageUrl}`}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded mb-2 border border-gray-200"
                  onError={e => { e.target.src = "https://via.placeholder.com/100?text=No+Image"; }}
                />
                <h4 className="font-semibold text-gray-800 text-center mb-1">{item.title}</h4>
                <p className="text-sm text-gray-600">Status: {item.status}</p>
              </div>
            ))}
          </div>
        )}

        <hr className="my-6" />
        <h3 className="text-lg font-semibold mb-3 text-indigo-600">Ongoing &amp; Completed Swaps</h3>
        <p className="text-gray-500 mb-6">Coming soon...</p>

        {user.role === "admin" && (
          <>
            <hr className="my-6" />
            <h3 className="text-lg font-semibold mb-3 text-indigo-600 flex items-center gap-2">🔐 Admin Panel</h3>
            <button
              onClick={() => navigate("/admin/pending-items")}
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-lg font-semibold shadow"
            >
              Review Pending Items
            </button>
          </>
        )}

        <hr className="my-6" />
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-semibold shadow w-full mt-2"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
