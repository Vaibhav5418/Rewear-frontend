// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register.js";
import Login from "./pages/Login.js";
import Dashboard from "./pages/Dashboard.js";
import AddItem from "./pages/AddItem.js";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-item" element={<AddItem />} />
      </Routes>
    </Router>
  );
}

export default App;
