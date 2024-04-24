import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from './SearchBar';

const Navbar = ({ onSearchInputChange, toggleCart, totalCartItems, currentRoute }) => {
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
      currentRoute !== '/admin' ? (
    <nav className="navbar navbar-expand-lg navbar-light sticky-top" style={{ backgroundColor: 'rgba(248, 244, 240, 1)' }}>
      <a className="navbar-brand" href="/" onClick={(e) => { e.preventDefault(); window.location.href = "/"; }}>
        <img src="/HAKIM4.png" alt="Hakim Livs" style={{ width: '150px', borderRadius: '10%', paddingBottom: "2px" }} />
      </a>
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
            <button className="nav-link cart-icon" onClick={toggleCart} style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <span className="badge bg-secondary" style={{ marginRight: '5px' }}>{totalCartItems}</span>
              <img src="/CART.png" alt="Cart" style={{ width: '80px', borderRadius: '50%' }} />
            </button>
          </li>
        </ul>
      </div>
    </nav>

  ) : (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: 'rgba(248, 244, 240, 1)' }}>
      <a className="navbar-brand" href="/" onClick={(e) => { e.preventDefault(); window.location.href = "/"; }}>
        <img src="/HAKIM4.png" alt="Hakim Livs" style={{ width: '150px', borderRadius: '10%', paddingBottom: "2px" }} />
      </a>
    </nav>
  )
 
  );
}

export default Navbar;
