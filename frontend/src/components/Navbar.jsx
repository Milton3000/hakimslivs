import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaShoppingCart } from 'react-icons/fa'; // Cart Icon
import SearchBar from './SearchBar';

const Navbar = ({ onSearchInputChange, toggleCart, totalCartItems }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchInputChange = (value) => {
    setSearchValue(value);
    onSearchInputChange(value);
  };

  const handleClearSearch = () => {
    setSearchValue('');
    onSearchInputChange('');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
      <a className="navbar-brand" href="/" onClick={(e) => { e.preventDefault(); window.location.href = "/"; }} style={{ fontSize: '34px', color: 'blue' }}>Hakim Livs</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto"></ul>
        <SearchBar 
          onSearchInputChange={handleSearchInputChange} 
          searchValue={searchValue}
          handleClearSearch={handleClearSearch}
        />
        <ul className="navbar-nav">
          <li className="nav-item">
            <button className="nav-link cart-icon" onClick={toggleCart} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
              <FaShoppingCart size={20} />
              <span className="badge bg-secondary">{totalCartItems}</span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
