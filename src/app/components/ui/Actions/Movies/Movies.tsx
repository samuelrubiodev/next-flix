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
    <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {filteredMovies.length > 0 ? filteredMovies.map(movie => (
        <Link
          href={{
            pathname: `/movies/${movie.id}`
          }}
          key={movie.id}
          className="hover:transform-[scale(1.05)] transition-all duration-150 ease-in-out"
        >
          <MovieCard
            title={movie.title || ""}
            posterImage={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://placehold.co/600x900/000000/FFFFFF/png"}
            genres={[]}
            overiew={movie.overview || ""} 
            releaseDate={movie.release_date ? new Date(movie.release_date) : new Date()}
            voteAverage={movie.vote_average || 0}
          />
        </Link>
      )) : (
        <div className="col-span-full text-center">
            <p className="text-white">No movies found.</p>
        </div>
      )}
    </div>
  );
}