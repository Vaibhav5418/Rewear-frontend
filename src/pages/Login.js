import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://rewear-backend-bcfm.onrender.com/api/auth/login", formData);

      const { token, user } = res.data;
      localStorage.setItem("token", token);

      alert("Login successful");

      // ✅ Redirect based on role
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }

    } catch (err) {
      console.error("Login error:", err);
      const errorMsg = err.response?.data?.message || "Login failed. Please try again.";
      alert("Error: " + errorMsg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-2xl shadow-xl p-9 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-indigo-700 tracking-wide">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg py-3 text-lg font-semibold mt-2 shadow"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{' '}
          <a href="/register" className="text-indigo-500 hover:underline font-medium">Register</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
