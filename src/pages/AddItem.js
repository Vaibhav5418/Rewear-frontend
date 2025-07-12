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
    <div style={{ padding: "20px" }}>
      <h2>Add New Item</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        /><br /><br />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        /><br /><br />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
        /><br /><br />
        <input
          type="text"
          name="type"
          placeholder="Type"
          value={formData.type}
          onChange={handleChange}
        /><br /><br />
        <input
          type="text"
          name="size"
          placeholder="Size"
          value={formData.size}
          onChange={handleChange}
        /><br /><br />
        <input
          type="text"
          name="condition"
          placeholder="Condition"
          value={formData.condition}
          onChange={handleChange}
        /><br /><br />
        <input
          type="text"
          name="tags"
          placeholder="Tags (comma-separated)"
          value={formData.tags}
          onChange={handleChange}
        /><br /><br />
        <input type="file" name="image" onChange={handleImageChange} /><br /><br />
        <button type="submit">Upload Item</button>
      </form>
    </div>
  );
}

export default AddItem;
