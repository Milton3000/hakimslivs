import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const Navbar = ({ onSearchInputChange }) => {
  // Reloadar sidan när man klickar på Hakim Livs
  const handleHomeButtonClick = () => {
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/" onClick={handleHomeButtonClick} style={{ fontSize: '34px', color: 'blue' }}>Hakim Livs</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
        </ul>
        <SearchBar onSearchInputChange={onSearchInputChange} />
        {/* <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/login">Logga in</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/register">Registrera</Link>
          </li>
        </ul> */}
      </div>
    </nav>
  );
}

export default Navbar;
