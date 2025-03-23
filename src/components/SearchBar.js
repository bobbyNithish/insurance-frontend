import React from "react";

const SearchBar = ({ searchQuery, setSearchQuery, onSearch }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-bar"
        placeholder="Search policies by name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        aria-label="Search policies"
      />
      <button 
        className="search-button"
        onClick={onSearch}
        aria-label="Search"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
