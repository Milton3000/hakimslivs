// Navbar.jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaShoppingCart } from 'react-icons/fa'; // Import Cart icon
import SearchBar from './SearchBar';

const Navbar = ({ onSearchInputChange, toggleCart, totalCartItems }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/" onClick={(e) => { e.preventDefault(); }} style={{ fontSize: '34px', color: 'blue' }}>Hakim Livs</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
        </ul>
        <SearchBar onSearchInputChange={onSearchInputChange} />
        {/* Add Cart icon here */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <button className="nav-link cart-icon" onClick={toggleCart} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
              <FaShoppingCart size={20} />
              <span className="badge bg-secondary">{totalCartItems}</span> {/* Display total cart items */}
            </button>
          </li>
        </ul>
        {/* End of Cart icon */}
      </div>
    </nav>
  );
}

export default Navbar;
