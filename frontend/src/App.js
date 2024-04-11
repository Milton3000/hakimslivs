import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Categories from "./pages/Categories";
import Navbar from "./components/Navbar";
import AdminPage from "./pages/AdminPage";
import Footer from "./components/Footer";
import Login from "./pages/Login";


function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="App">
      <Router>
        <Navbar onSearchInputChange={handleSearchInputChange} />
        <Routes>
          <Route path="/" element={<Home searchQuery={searchQuery} />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer /> 
      </Router>
  </div>
  );
}

export default App;