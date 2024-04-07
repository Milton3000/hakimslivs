import React from 'react';

const SearchBar = ({ onSearchInputChange }) => {
  return (
    <div className="mx-auto" style={{ maxWidth: "300px" }}>
      <div className="input-group">
        <input
          className="form-control"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={(e) => onSearchInputChange(e.target.value)}
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-success"
            type="button"
          >
            Sök
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
