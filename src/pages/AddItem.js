import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseURL = process.env.REACT_APP_BASE_URL;

function AddItem() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    type: "",
    size: "",
    condition: "",
    tags: "",
  });

  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to upload.");
      navigate("/login");
      return;
    }

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });
    if (image) form.append("image", image);

    try {
      const res = await axios.post(`${baseURL}/items`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("✅ Item listed successfully!");
      setFormData({
        title: "",
        description: "",
        category: "",
        type: "",
        size: "",
        condition: "",
        tags: "",
      });
      setImage(null);
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to add item");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-12 px-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-indigo-200 rounded-full opacity-20 animate-pulse delay-2000"></div>
      </div>

      <div className="relative flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-full max-w-lg border border-white/20 transform hover:scale-[1.02] transition-all duration-300">
          {/* Header with animated gradient text */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              Add New Item
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full mx-auto animate-pulse"></div>
          </div>

          {/* Animated message */}
          {message && (
            <div className={`text-center font-medium mb-6 p-4 rounded-xl animate-fade-in ${
              message.startsWith("✅") 
                ? "bg-green-50 text-green-700 border border-green-200" 
                : "bg-red-50 text-red-700 border border-red-200"
            }`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
            {/* Form fields with enhanced styling */}
            <div className="group">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full p-4 rounded-xl border-2 border-gray-200 text-base bg-white/70 backdrop-blur-sm focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-300 group-hover:border-purple-300 placeholder-gray-500"
              />
            </div>

            <div className="group">
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full p-4 rounded-xl border-2 border-gray-200 text-base bg-white/70 backdrop-blur-sm focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-300 group-hover:border-purple-300 placeholder-gray-500 resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="group">
                <input
                  type="text"
                  name="category"
                  placeholder="Category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-4 rounded-xl border-2 border-gray-200 text-base bg-white/70 backdrop-blur-sm focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-300 group-hover:border-purple-300 placeholder-gray-500"
                />
              </div>
              <div className="group">
                <input
                  type="text"
                  name="type"
                  placeholder="Type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full p-4 rounded-xl border-2 border-gray-200 text-base bg-white/70 backdrop-blur-sm focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-300 group-hover:border-purple-300 placeholder-gray-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="group">
                <input
                  type="text"
                  name="size"
                  placeholder="Size"
                  value={formData.size}
                  onChange={handleChange}
                  className="w-full p-4 rounded-xl border-2 border-gray-200 text-base bg-white/70 backdrop-blur-sm focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-300 group-hover:border-purple-300 placeholder-gray-500"
                />
              </div>
              <div className="group">
                <input
                  type="text"
                  name="condition"
                  placeholder="Condition"
                  value={formData.condition}
                  onChange={handleChange}
                  className="w-full p-4 rounded-xl border-2 border-gray-200 text-base bg-white/70 backdrop-blur-sm focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-300 group-hover:border-purple-300 placeholder-gray-500"
                />
              </div>
            </div>

            <div className="group">
              <input
                type="text"
                name="tags"
                placeholder="Tags (comma-separated)"
                value={formData.tags}
                onChange={handleChange}
                className="w-full p-4 rounded-xl border-2 border-gray-200 text-base bg-white/70 backdrop-blur-sm focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-300 group-hover:border-purple-300 placeholder-gray-500"
              />
            </div>

            {/* Enhanced file input */}
            <div className="group">
              <div className="relative">
                <input
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  className="w-full p-4 rounded-xl border-2 border-gray-200 text-base bg-white/70 backdrop-blur-sm focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-300 group-hover:border-purple-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/5 to-indigo-500/5 pointer-events-none"></div>
              </div>
            </div>

            {/* Enhanced submit button */}
            <button
              type="submit"
              className="w-full relative overflow-hidden bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 text-white rounded-xl py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center justify-center">
                <svg className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Upload Item
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            </button>
          </form>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default AddItem;