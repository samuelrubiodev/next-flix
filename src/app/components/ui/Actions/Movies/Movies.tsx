import MovieCard from "./MovieCard";
import Link from "next/link";
import { GenericActionsProps } from "@/types/actions/types";

export default function Movies(props: GenericActionsProps) {
  const filteredMovies = (props.movies ?? [])
    .filter(movie => {
      if (props.selectedGenre != "1" && props.selectedGenre !== "") {
        const genreId = parseInt(props.selectedGenre || "", 10);
        if (!movie.genre_ids?.includes(genreId)) {
          return false;
        }
      }

      /*
        if (props.calification !== "Select calification" && props.calification !== "") {
          const minRating = parseFloat(props.calification || "");
          if ((movie.vote_average || 0) < minRating) {
            return false;
          }
        }
      */

      const searchTerm = props.searchTerm ?? "";
      if (searchTerm.trim() !== "" && !movie.title?.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      return true;
    });  
  
    /*
        .sort((a, b) => {
      switch (props.sort) {
        case "rating_desc":
          return (b.vote_average || 0) - (a.vote_average || 0);
        case "rating_asc":
          return (a.vote_average || 0) - (b.vote_average || 0);
        case "date_desc": {
          const dateA = a.first_air_date ? new Date(a.first_air_date).getTime() : 0;
          const dateB = b.first_air_date ? new Date(b.first_air_date).getTime() : 0;
          return dateB - dateA;
        }
        case "date_asc": {
          const dateA = a.first_air_date ? new Date(a.first_air_date).getTime() : 0;
          const dateB = b.first_air_date ? new Date(b.first_air_date).getTime() : 0;
          return dateA - dateB;
        }
        default:
          return 0;
      }
    })

    */

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