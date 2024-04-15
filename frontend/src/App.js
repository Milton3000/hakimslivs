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
  const [totalCartItems, setTotalCartItems] = useState(0); // New state for total cart items

  const handleSearchInputChange = (query) => {
    setSearchQuery(query);
  };

  const addToCart = (product) => {
    const existingItemIndex = cartItems.findIndex(item => item._id === product._id);
    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += 1;
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    setTotalCartItems(totalCartItems + 1); // Increment total cart items
  };

  const removeFromCart = (productToRemove) => {
    const updatedCartItems = cartItems.filter((product) => product !== productToRemove);
    const removedQuantity = productToRemove.quantity; // Get the quantity of the removed item
    setCartItems(updatedCartItems);
    setTotalCartItems(totalCartItems - removedQuantity); // Decrement total cart items by the removed quantity
};


  const updateQuantity = (productId, change) => {
    const updatedCartItems = cartItems.map((item) => {
        if (item._id === productId) {
            const newQuantity = item.quantity + change;
            // Ensure quantity does not go below 1
            const updatedQuantity = Math.max(newQuantity, 1);
            return { ...item, quantity: updatedQuantity };
        }
        return item;
    });

    // Calculate the total quantity in the cart
    const totalQuantity = updatedCartItems.reduce((total, item) => total + item.quantity, 0);
    
    setCartItems(updatedCartItems);
    setTotalCartItems(totalQuantity); // Update total cart items
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
        <Navbar onSearchInputChange={handleSearchInputChange} toggleCart={toggleCart} totalCartItems={totalCartItems} />
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
