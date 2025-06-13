import { MovieResult } from "moviedb-promise";
import MovieCard from "./MovieCard";
import Link from "next/link";

type MoviesProps = {
  movies: MovieResult[],
  searchTerm: string
};

export default function Movies(props: MoviesProps) {
  const filteredMovies = props.searchTerm.trim() === "" 
    ? props.movies
    : props.movies.filter(movie => 
      movie.title?.toLowerCase().includes(props.searchTerm.toLowerCase())
  );  

  return (
    <>
    {filteredMovies.length > 0 ? filteredMovies.map(movie => (
      <Link
        href={{
          pathname: `/movies/${movie.id}`
        }}
        className="mr-5 hover:transform-[scale(1.05)] transition-all duration-150 ease-in-out"
        key={movie.id}
      >
        <MovieCard
          title={movie.title || ""}
          posterImage={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : ""}
          genres={[]}
          overiew={movie.overview || ""}
          relaseDate={movie.release_date ? new Date(movie.release_date) : new Date()}
          voteAverage={movie.vote_average || 0}
        />
      </Link>
    ) ) : <p className="text-black">No movies found.</p>}
    </>
  );
}