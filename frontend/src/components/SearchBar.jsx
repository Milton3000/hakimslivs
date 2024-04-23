import React from 'react';

const SearchBar = ({ onSearchInputChange, searchValue, handleClearSearch }) => {
  return (
    <div className="mx-auto" style={{ width: "300px" }}>
      <div className="input-group">
        <input
          className="form-control"
          type="search"
          placeholder="Sök"
          aria-label="Sök"
          value={searchValue}
          onChange={(e) => onSearchInputChange(e.target.value)}
        />
      </div>
      {searchValue && (
        <div className="mt-2">
          <button className="btn btn-outline-secondary w-100" type="button" onClick={handleClearSearch}>
            Rensa sökning
          </button>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
