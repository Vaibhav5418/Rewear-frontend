import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const res = await axios.get("http://localhost:5000/api/auth/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.user);
    } catch (err) {
      alert("Unauthorized. Please log in again.");
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Welcome, {user.name}</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Points:</strong> {user.points}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
