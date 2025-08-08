import React, { useState } from "react";
import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

function Register() {
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", // 👈 role is fixed as "user"
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${baseURL}/auth/send-otp`, { email: formData.email });
      alert("OTP sent to your email");
      setStep(2);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send OTP");
    }
  };

  const handleVerifyAndRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${baseURL}/auth/register`, { ...formData, otp });
      alert("Registration successful");
      window.location.href = "/";
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-2xl shadow-xl p-9 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-indigo-700">Register</h2>

        {step === 1 && (
          <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
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
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg py-3 text-lg font-semibold mt-2 shadow"
            >
              Send OTP
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyAndRegister} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="p-3 rounded-lg border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white rounded-lg py-3 text-lg font-semibold shadow"
            >
              Verify & Register
            </button>
          </form>
        )}

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <a href="/" className="text-indigo-500 hover:underline font-medium">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
