import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Categories from './pages/Categories';
import Navbar from './components/Navbar';
import AdminPage from './pages/AdminPage';
import Footer from './components/Footer';
import Login from './pages/Login';
import Cart from './components/Cart';
import Payment from './components/Payment';
import Confirmation from './components/Confirmation';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [totalCartItems, setTotalCartItems] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentRoute, setCurrentRoute] = useState('/');

  useEffect(() => {
    // Loada items from localStorage
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
    // Kalkylera total cart items
    const totalQuantity = storedCartItems.reduce((total, item) => total + item.quantity, 0);
    setTotalCartItems(totalQuantity);
  }, []);

  const handleSearchInputChange = (query) => {
    setSearchQuery(query);
  };

  const addToCart = (product) => {
    const existingItemIndex = cartItems.findIndex(item => item._id === product._id);
    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += 1;
      setCartItems(updatedCartItems);
      // Update localStorage efter updating state
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
      // Update localStorage efter updating state
      localStorage.setItem('cartItems', JSON.stringify([...cartItems, { ...product, quantity: 1 }]));
    }
    setTotalCartItems(totalCartItems + 1); // Incrementa totala cart items
  };

  const removeFromCart = (productToRemove) => {
    const updatedCartItems = cartItems.filter((product) => product !== productToRemove);
    const removedQuantity = productToRemove.quantity; // Hämta antalet av removed item
    setCartItems(updatedCartItems);
    setTotalCartItems(totalCartItems - removedQuantity); // Decrement totala cart items av removed quantity
    // Uppdatera localStorage efter updating state
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const updateQuantity = (productId, change) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item._id === productId) {
        const newQuantity = item.quantity + change;
        // Se till att quantity inte går under 1
        const updatedQuantity = Math.max(newQuantity, 1);
        return { ...item, quantity: updatedQuantity };
      }
      return item;
    });

    // Kalkylera totala quantity i cart
    const totalQuantity = updatedCartItems.reduce((total, item) => total + item.quantity, 0);

    setCartItems(updatedCartItems);
    setTotalCartItems(totalQuantity); // Uppdatera totala cart items
    // Uppdatera localStorage
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const handleCloseCart = () => {
    setShowCart();
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const clearCart = () => {
    setCartItems([]);
    setTotalCartItems(0);
    localStorage.removeItem('cartItems');
  };

  return (
    <div className="App">
      <Router>
        <Navbar
          onSearchInputChange={handleSearchInputChange}
          toggleCart={toggleCart}
          totalCartItems={totalCartItems}
          currentRoute={currentRoute}
        />
        <Routes>
          <Route
            path="/"
            element={<Home searchQuery={searchQuery} addToCart={addToCart} setShowCart={setShowCart} />}
          />
          <Route path="/" element={<Home searchQuery={searchQuery} />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/categories" element={<Categories />} />
          <Route
            path="/admin"
            element={
              isLoggedIn ? <AdminPage setCurrentRoute={setCurrentRoute} /> : <Navigate to="/login" />
            }
          />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/betalning" element={<Payment cartItems={cartItems} />} />
          <Route path="/confirmation" element={<Confirmation clearCart={clearCart} />} />
        </Routes>
        <Footer
        currentRoute={currentRoute} />
      </Router>
      {showCart && <Cart cartItems={cartItems} handleClose={handleCloseCart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />}
    </div>
  );
}


export default App;
