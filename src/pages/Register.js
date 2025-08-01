import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseURL = process.env.REACT_APP_BASE_URL;

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", // default role
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${baseURL}/auth/register`, formData);
      alert("Registration successful");
      navigate("/");
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || err.message || "Registration failed.";
      alert("Error: " + errorMsg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-2xl shadow-xl p-9 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-indigo-700 tracking-wide">Register</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
            className="p-3 rounded-lg border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="p-3 rounded-lg border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="p-3 rounded-lg border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {/* Role selection dropdown */}
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="p-3 rounded-lg border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg py-3 text-lg font-semibold mt-2 shadow"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{' '}
          <a href="/" className="text-indigo-500 hover:underline font-medium">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
