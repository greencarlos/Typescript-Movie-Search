function MovieCard({ movie }) {
  if (!movie) return null;

  const poster = movie.image?.original;
  const year = movie.premiered ? movie.premiered.slice(0, 4) : "N/A";

  return (
    <div className="movie-card">
      <img src={poster} alt={movie.name} />
      <h3>{movie.name}</h3>
      <p>{year}</p>
    </div>
  );
}

export default MovieCard;
