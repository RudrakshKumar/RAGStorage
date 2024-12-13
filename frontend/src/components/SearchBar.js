import React, { useState } from 'react';

const SearchBar = () => {
  const [query, setQuery] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    alert(`Searching for: ${query}`);
    // Replace the alert with your search logic
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        width: '90%',
        maxWidth: '800px',
        backgroundColor: 'black',
        padding: '10px',
        borderRadius: '30px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          flex: 1,
          color:"white",
          border: 'none',
          outline: 'none',
          fontSize: '16px',
          padding: '10px',
          backgroundColor: '#282828c4',
          borderRadius: '20px',
        }}
      />
      <button
        type="submit"
        onClick={handleSearch}
        style={{
          border: 'none',
          background: 'none',
          cursor: 'pointer',
          padding: '10px',
          fontSize: '16px',
          color: '#007BFF',
          fontWeight: 'bold',
        }}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
