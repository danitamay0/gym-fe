import React, { useState, useEffect } from 'react';

const ClientSearch = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  // Debounce con 500ms
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  // Llamar el callback cuando cambia el query debounced
  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery]);

  return (
    <input
      type="text"
      placeholder="Buscar cliente"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

export default ClientSearch;