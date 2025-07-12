import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      const res = await axios.post("http://localhost:5000/api/items", form, {
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
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white rounded-2xl shadow-xl p-9 w-full max-w-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 tracking-wide">Add New Item</h2>
      {message && (
        <p className={`text-center font-medium mb-2 ${message.startsWith("✅") ? "text-green-600" : "text-red-600"}`}>{message}</p>
      )}
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="p-3 rounded-lg border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="p-3 rounded-lg border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-vertical"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="p-3 rounded-lg border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <input
          type="text"
          name="type"
          placeholder="Type"
          value={formData.type}
          onChange={handleChange}
          className="p-3 rounded-lg border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <input
          type="text"
          name="size"
          placeholder="Size"
          value={formData.size}
          onChange={handleChange}
          className="p-3 rounded-lg border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <input
          type="text"
          name="condition"
          placeholder="Condition"
          value={formData.condition}
          onChange={handleChange}
          className="p-3 rounded-lg border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <input
          type="text"
          name="tags"
          placeholder="Tags (comma-separated)"
          value={formData.tags}
          onChange={handleChange}
          className="p-3 rounded-lg border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
          className="text-base rounded-lg border border-gray-300 p-2"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg py-3 text-lg font-semibold mt-2 shadow hover:from-indigo-600 hover:to-indigo-700 transition-all"
        >
          Upload Item
        </button>
      </form>
    </div>
  </div>
);
}

export default AddItem;
