// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Categories from './pages/Categories';
import Navbar from './components/Navbar';
import AdminPage from './pages/AdminPage';
import Footer from './components/Footer';
import Login from './pages/Login';
import Cart from './components/Cart';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const handleSearchInputChange = (query) => {
    setSearchQuery(query);
  };

  const addToCart = (product) => {
    setCartItems([...cartItems, { ...product, quantity: 1 }]);
    console.log("Cart items:", [...cartItems, product]);
  };


  const removeFromCart = (productToRemove) => {
    const updatedCartItems = cartItems.filter((product) => product !== productToRemove);
    setCartItems(updatedCartItems);
  };

  const updateQuantity = (productId, change) => {
    const updatedCartItems = cartItems.map((item) => {
        if (item._id === productId) {
            return { ...item, quantity: item.quantity + change };
        }
        return item;
    });
    setCartItems(updatedCartItems);
};

  
  

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const handleCloseCart = () => {
    setShowCart(false);
  };

  return (
    <div className="App">
      <Router>
        <Navbar onSearchInputChange={handleSearchInputChange} toggleCart={toggleCart} />
        <Routes>
          <Route
            path="/"
            element={<Home searchQuery={searchQuery} addToCart={addToCart} setShowCart={setShowCart} />}
          />
          <Route path="/auth" element={<Auth />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </Router>
      {showCart && <Cart cartItems={cartItems} handleClose={handleCloseCart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />}
    </div>
  );
}

export default App;
