function SearchBar({ query, setQuery }) {
  return (
    <input
      type="text"
      placeholder="Searching for a movie..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

export default SearchBar;
