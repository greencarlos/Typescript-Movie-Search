import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import MovieCard from "./components/MovieCard";

function App() {
  const [query, setQuery] = useState<string>("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!query.trim()) {
      setMovies([]);
      setError("");
      return;
    }

    const fetchMovies = async () => {
      setLoading(true);
      setError("");

      try {
        const safeQuery = encodeURIComponent(query);
        const response = await fetch(
          `https://api.tvmaze.com/search/shows?q=${safeQuery}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        const shows = data.map((item) => item.show).filter(Boolean);

        if (shows.length === 0) {
          setError("No results found. Try another search");
          setMovies([]);
        } else {
          setMovies(shows);
        }
      } catch (err) {
        setError(`Something went wrong while fetching data. ${err}`);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  return (
    <div className="app">
      <h1>🍿 Movie Search App</h1>
      <SearchBar query={query} setQuery={setQuery} />
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="movies">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default App;
