// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register.js";
import Login from "./pages/Login.js";
import Dashboard from "./pages/Dashboard.js";
import AddItem from "./pages/AddItem.js";
import Home from "./pages/Home.js";
import ItemDetail from "./pages/ItemDetail";
import AdminPanel from "./pages/AdminPanel";


function App() {
  return (
    <Router>
          <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/add-item" element={<AddItem />} />
              <Route path="/item/:id" element={<ItemDetail />} />
              <Route path="/admin" element={<AdminPanel />} />
          </Routes>
    </Router>
  );
}

export default App;
